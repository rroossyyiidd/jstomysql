var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "wilayah"
});

var databps = fs.readFileSync('databaru.json', 'utf8');
var dataLokasi = JSON.parse(databps);

con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM data_wilayah", function (err, result, fields) {
        if (err) throw err;
        data = result;
        var jml = 1;
        const newLokasi = dataLokasi.map(value => {
            console.log(jml + " data(s) updated");

            jml = jml + 1;
            return {
                type: "Provinsi",
                ...value,
                kota: value.kota.map(value2 => {
                    var cek = data.find(item => item.bps_id_kota == value2.id);
                    return {
                        ...value2,
                        type: cek['type_kota'],
                        rajaongkir_id: cek['raja_id_city'],
                        kecamatan: value2.kecamatan.map(value3 => {
                            return {
                                ...value3,
                                type: "Kecamatan"
                            }
                        })
                    }
                })
            }
        });

        var str = JSON.stringify(newLokasi);
        fs.writeFile('datajson.json', str, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    });
});