
try {

  function initSmartContractAbisDB() {

    const abi = JSON.parse(cat('/scripts/common/contracts/ERC20.abi'));

    hancockDb = db.getSiblingDB("hancock");
    collection = hancockDb.sc_abi;

    let res = [
      collection.drop(),
      collection.createIndex({ 'name': 1 }, { unique: true }),
      collection.createIndex({ 'abi': 1 }),
      collection.insert({ "name": "erc20", "abi": abi }),

    ];

    printjson(res);
  }

  initSmartContractAbisDB();

} catch (error) {

  print('Error, exiting', error);
  quit(1);

}

quit(0);