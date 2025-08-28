<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / JSON

# JSON

### Data Structures

| Class | Description |
| ------ | ------ |
| [JSONMap](JSONMap.md) | A Map-like data structure that allows objects conforming to `JsonObject` as keys. |
| [JSONSet](JSONSet.md) | A Set-like collection for objects that can be serialized to JSON. |

### Serialization

| Name | Description |
| ------ | ------ |
| [specialBegin](specialBegin.md) | The beginning of a special JSON value |
| [specialFinish](specialFinish.md) | The end of a special JSON value |
| [replacer](replacer.md) | Used with JSON.stringify to encode a wider range of objects into strings that can later be decoded with [reviver](reviver.md) |
| [reviver](reviver.md) | Used with JSON.parse to decode objected encoded by [replacer](replacer.md) |
