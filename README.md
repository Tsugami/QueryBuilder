<h1 align="center">🚧 QueryBuilder 🚧</h1>
<p align="center">Simple QueryBuilder with multiple database support for learning purposes</p>

<p align="center">
  <img src="https://img.shields.io/github/workflow/status/Tsugami/QueryBuilder/CI?style=flat-square">
  <img src="https://img.shields.io/github/license/Tsugami/QueryBuilder?style=flat-square"/>
  <img src="https://img.shields.io/tokei/lines/github/Tsugami/QueryBuilder?style=flat-square">
  <img src="https://img.shields.io/github/package-json/v/Tsugami/QueryBuilder?style=flat-square">
  <img src="https://badgen.net/badge/code%20style/airbnb/ff5a5f?style=flat-square">
</p>


<h2>✅ Todo</h2>
- [x] Array Support (Created to tests)
- [ ] PostgreSQL Support
- [ ] MongoDb Support

<h2>🔨 Usage</h2>
<p>The QueryBuilder already queries a pre-defined table in QueryRunner
</p>

```ts
const user = await QueryRunner
  .createQueryBuilder()
  .column('id')
  .Equal(1)
  .getOne()
```
