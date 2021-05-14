[@technobuddha/library](../..) / [Modules](../Modules.md) / wordwrap

# Module: wordwrap

## Table of contents

### References

- [default](wordwrap.md#default)

### Functions

- [wordwrap](wordwrap.md#wordwrap)

## References

### default

Renames and exports: [wordwrap](wordwrap.md#wordwrap)

## Functions

### wordwrap

▸ **wordwrap**(`input`: *string*, `__namedParameters?`: Options): *string*

Wrap text so that it fits within a area of fixed width

**`default`** width 75

**`default`** separator \n

**`default`** cut default false

**`default`** preserveSpaces  false

**`default`** trailingSpaces false

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | *string* | - | the text to wrap |
| `__namedParameters` | Options | {} | - |

**Returns:** *string*

wrapped text

Defined in: [src/wordwrap.ts:29](../src/wordwrap.ts#L29)
