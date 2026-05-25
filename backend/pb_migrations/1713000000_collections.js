migrate((db) => {
  const collection = new Collection({
    "id": "leads_table_ids",
    "name": "leads",
    "type": "base",
    "system": false,
    "schema": [
      { "id": "field_name", "name": "name", "type": "text", "required": true, "options": { "max": 100 } },
      { "id": "field_email", "name": "email", "type": "email", "required": true, "options": { "exceptDomains": [], "onlyDomains": [] } },
      { "id": "field_phone", "name": "phone", "type": "text", "required": false, "options": { "max": 20 } },
      { "id": "field_business", "name": "businessName", "type": "text", "required": false, "options": { "max": 100 } },
      { "id": "field_message", "name": "message", "type": "text", "required": true, "options": { "max": 5000 } }
    ],
    "listRule": "@request.auth.id != ''",
    "viewRule": "@request.auth.id != ''",
    "createRule": "",
    "updateRule": "@request.auth.id != ''",
    "deleteRule": "@request.auth.id != ''"
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("leads");
  return dao.deleteCollection(collection);
})
