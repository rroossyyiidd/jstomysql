var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "wilayah"
});

var data = fs.readFileSync('databaru.json', 'utf8');
var dataLokasi = JSON.parse(data);

con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM data_wilayah", function (err, result, fields) {
        if (err) throw err;
        data = result;

        const newLokasi = dataLokasi.map(provinsi=>{
            return {
                ...provinsi,
                kota:provinsi.kota.map(kota=>{
                    return {
                        ...kota,
                        rajaongkir_id:datarajaongkir.find(item=>item.kota_id===kota.id).raja_city_id
                    }
                })
            }
        })

        // var str = JSON.stringify(datas);
        // fs.writeFile('datajson.txt', datas, function (err) {
        //     if (err) throw err;
        //     console.log('Saved!');
        // });
    });
});