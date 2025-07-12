import { writeFileSync } from 'node:fs';
import ts from 'typescript';

type FieldInfo = {
  isNullable: boolean;
  name: string;
  type: string;
  isOptional: boolean;
  isEnum?: boolean;
};
type ParsedData = {
  enums: Map<string, string[]>;
  tables: { [key: string]: FieldInfo[] };
};

const INPUT_FILE = './src/lib/database/types.g.ts';
const OUTPUT_FILE = './src/lib/database/schema.g.ts';

const toPascalCase = (str: string): string => str.split('_').map((word) =>
  word.charAt(0).toUpperCase() + word.slice(1)
).join('');

const getTypeNodeEnum = (typeNode: ts.TypeNode, enums: Map<string, string[]>): null | string => {
  const typeText = typeNode.getText();
  const isEnum = typeText.includes('Enums');
  if (!isEnum) {
    return null;
  }

  const values = (typeText.match(/([a-z_$][\w$]*)|'([^']+)'/gi) ?? [])
    .map((s: string) => s.replace(/^'|'$/g, ''));
  const enumName = values.at(-1) ?? '';

  return enums.has(enumName) ? enumName : null;
};

const parseTypeNode = (
  typeNode: ts.TypeNode,
  enums: Map<string, string[]>
): Pick<FieldInfo, 'isEnum' | 'isNullable' | 'type'> => {
  const defaultValue = { isNullable: false, type: 'unknown' };

  if (ts.isUnionTypeNode(typeNode)) {
    const types = typeNode.getText().split(' | ');
    const nonNullable = types[0] === 'null' ? types[1] : types[0];
    const enumName = getTypeNodeEnum(typeNode, enums);

    return {
      isEnum: Boolean(enumName),
      isNullable: true,
      type: enumName ?? nonNullable
    };
  }

  if (ts.isLiteralTypeNode(typeNode)) {
    if (ts.isStringLiteral(typeNode.literal)) {
      return { isNullable: false, type: 'string' };
    }
    if (ts.isNumericLiteral(typeNode.literal)) {
      return { isNullable: false, type: 'number' };
    }
    if (typeNode.literal.kind === ts.SyntaxKind.TrueKeyword ||
      typeNode.literal.kind === ts.SyntaxKind.FalseKeyword) {
      return { isNullable: false, type: 'boolean' };
    }
  }

  if (ts.isArrayTypeNode(typeNode)) {
    return { isNullable: false, type: 'array' };
  }

  if (typeNode.kind === ts.SyntaxKind.StringKeyword) {
    return { isNullable: false, type: 'string' };
  }
  if (typeNode.kind === ts.SyntaxKind.NumberKeyword) {
    return { isNullable: false, type: 'number' };
  }
  if (typeNode.kind === ts.SyntaxKind.BooleanKeyword) {
    return { isNullable: false, type: 'boolean' };
  }
  if (typeNode.kind === ts.SyntaxKind.NullKeyword) {
    return { isNullable: false, type: 'null' };
  }
  if (typeNode.kind === ts.SyntaxKind.UnknownKeyword) {
    return { isNullable: false, type: 'unknown' };
  }

  if (!ts.isIndexedAccessTypeNode(typeNode)) {
    return defaultValue;
  }

  const enumName = getTypeNodeEnum(typeNode, enums);
  if (!enumName) {
    return defaultValue;
  }

  return { isEnum: true, isNullable: false, type: enumName };
};

const parseEnumValues = (node: ts.PropertySignature): string[] => {
  const values: string[] = [];

  if (node.type && ts.isUnionTypeNode(node.type)) {
    node.type.types.forEach((type) => {
      if (ts.isLiteralTypeNode(type) && ts.isStringLiteral(type.literal)) {
        values.push(type.literal.text);
      }
    });
  }

  return values;
};

const parseField = (node: ts.PropertySignature, enums: Map<string, string[]>): FieldInfo => {
  const name = (node.name as ts.Identifier).text;
  const isOptional = !!node.questionToken;

  if (!node.type) {
    return { isNullable: false, isOptional, name, type: 'unknown' };
  }

  return { isOptional, name, ...parseTypeNode(node.type, enums) };
};

const parseEnums = (node: ts.PropertySignature, enums: Map<string, string[]>): void => {
  if (!node.type || !ts.isTypeLiteralNode(node.type)) {
    return;
  }

  node.type.members.forEach((member) => {
    if (ts.isPropertySignature(member) && ts.isIdentifier(member.name)) {
      enums.set(member.name.text, parseEnumValues(member));
    }
  });
};

const parseTableFields = (
  node: ts.PropertySignature,
  enums: Map<string, string[]>
): FieldInfo[] => {
  const fields: FieldInfo[] = [];

  if (node.type && ts.isTypeLiteralNode(node.type)) {
    node.type.members.forEach((member) => {
      if (ts.isPropertySignature(member) && ts.isIdentifier(member.name)) {
        const field = parseField(member, enums);
        fields.push(field);
      }
    });
  }

  return fields;
};

const parseTable = (
  tableName: string,
  node: ts.PropertySignature,
  data: ParsedData
): void => {
  if (!node.type || !ts.isTypeLiteralNode(node.type)) {
    return;
  }

  const rowMember = node.type.members.find((m) =>
    ts.isPropertySignature(m) &&
    ts.isIdentifier(m.name) &&
    m.name.text === 'Row'
  ) as ts.PropertySignature;
  const insertMember = node.type.members.find((m) =>
    ts.isPropertySignature(m) &&
    ts.isIdentifier(m.name) &&
    m.name.text === 'Insert'
  ) as ts.PropertySignature;
  const updateMember = node.type.members.find((m) =>
    ts.isPropertySignature(m) &&
    ts.isIdentifier(m.name) &&
    m.name.text === 'Update'
  ) as ts.PropertySignature;

  if (rowMember) {
    const fields = parseTableFields(rowMember, data.enums);
    data.tables[tableName] = fields;
  }
  if (insertMember) {
    const fields = parseTableFields(insertMember, data.enums);
    data.tables[`${tableName}:insert`] = fields;
  }
  if (updateMember) {
    const fields = parseTableFields(updateMember, data.enums);
    data.tables[`${tableName}:update`] = fields;
  }
};

const parseTables = (node: ts.PropertySignature, data: ParsedData): void => {
  if (!node.type || !ts.isTypeLiteralNode(node.type)) {
    return;
  }

  node.type.members.forEach((member) => {
    if (ts.isPropertySignature(member) && ts.isIdentifier(member.name)) {
      const tableName = member.name.text;
      parseTable(tableName, member, data);
    }
  });
};

const parsePublicSchema = (node: ts.PropertySignature, data: ParsedData): void => {
  if (!node.type || !ts.isTypeLiteralNode(node.type)) {
    return;
  }

  node.type.members.forEach((member) => {
    if (ts.isPropertySignature(member) && ts.isIdentifier(member.name)) {
      switch (member.name.text) {
        case 'Enums':
          parseEnums(member, data.enums);
          break;
        case 'Tables':
          parseTables(member, data);
          break;
      }
    }
  });
};

const parseDatabase = (node: ts.TypeAliasDeclaration, data: ParsedData): void => {
  if (!ts.isTypeLiteralNode(node.type)) {
    return;
  }

  node.type.members.forEach((member) => {
    const parsePublic =
        ts.isPropertySignature(member) &&
        ts.isIdentifier(member.name) &&
        member.name.text === 'public';

    if (parsePublic) {
      parsePublicSchema(member, data);
    }
  });
};

const generateSchemaName = (name: string): string => `${toPascalCase(name)}Schema`;

const generateField = (field: FieldInfo): string => {
  if (field.isEnum) {
    return generateSchemaName(field.type);
  }

  switch (field.type) {
    case 'boolean':
      return 'v.boolean()';
    case 'number':
      return 'v.number()';
    case 'string':
      return 'v.string()';
    default:
      return 'v.unknown()';
  }
};

const generateNullableField = (schema: string, nullable: boolean): string => {
  if (!nullable) {
    return schema;
  }

  return `v.nullable(${schema})`;
};

const generateOptionalField = (schema: string, optional: boolean): string => {
  if (!optional) {
    return schema;
  }

  return `v.optional(${schema})`;
};

const generateFieldSchema = (field: FieldInfo): string => generateOptionalField(
  generateNullableField(
    generateField(field),
    field.isNullable
  ),
  field.isOptional
);

const generateEnumSchema = (name: string, values: string[]): string => `export const ${generateSchemaName(name)} = v.picklist([${
  values.map((v) => `'${v}'`).join(', ')
}]);`;

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const generateTableSchema = (
  name: string,
  fields: FieldInfo[]
): string => {
  const [tableName, tableModifier] = name.split(':');
  const isInsert = tableModifier === 'insert';
  const isUpdate = tableModifier === 'update';
  const schemaName = generateSchemaName(`${toPascalCase(tableName)}${tableModifier ? capitalize(tableModifier) : ''}`);

  const schemaFields = fields.map((field) => {
    let fieldSchema = field;

    if (isInsert && field.name === 'id') {
      return null;
    }

    if (isUpdate) {
      fieldSchema = { ...field, isOptional: true };
    }

    const schema = generateFieldSchema(fieldSchema);
    return `  ${field.name}: ${schema},`;
  }).filter(Boolean).join('\n');

  const schema = `export const ${schemaName} = v.object({\n${schemaFields}\n});`;
  const type = `export type ${schemaName}Type = v.InferOutput<typeof ${schemaName}>;`;
  return [schema, type].join('\n');
};

const visitNode = (node: ts.Node, data: ParsedData): void => {
  if (ts.isTypeAliasDeclaration(node) && node.name.text === 'Database') {
    parseDatabase(node, data);
  }

  ts.forEachChild(node, (child) => {
    visitNode(child, data);
  });
};

const parseTypeFile = (filePath: string): ParsedData => {
  const program = ts.createProgram([filePath], {
    allowJs: true,
    skipLibCheck: true,
    target: ts.ScriptTarget.Latest
  });

  const sourceFile = program.getSourceFile(filePath)!;
  program.getTypeChecker();

  const parsedData: ParsedData = {
    enums: new Map(),
    tables: {}
  };

  visitNode(sourceFile, parsedData);
  return parsedData;
};

const generateSchemas = (data: ParsedData): string => {
  const schemas: string[] = [];

  schemas.push(
    '/* THIS FILE IS AUTO-GENERATED. DO NOT EDIT IT. */\n',
    '\n',
    'import * as v from \'valibot\';\n'
  );

  for (const [name, values] of data.enums.entries()) {
    schemas.push(generateEnumSchema(name, values));
  }

  schemas.push('');

  Object.entries(data.tables).forEach(([name, table]) => {
    schemas.push(generateTableSchema(name, table));
    schemas.push('');
  });

  return schemas.join('\n');
};

const generateSupabaseValibot = (): void => {
  console.log('Started generating schemas');
  const data = parseTypeFile(INPUT_FILE);
  console.log(`Found ${data.enums.size} enums and ${Object.keys(data.tables).length} tables`);

  const schemas = generateSchemas(data);
  writeFileSync(OUTPUT_FILE, schemas);

  console.log(`Generated schemas in ${OUTPUT_FILE}`);
};

generateSupabaseValibot();
