var mysql = require('mysql');
var fs = require('fs');

var data = fs.readFileSync('datarjo.json', 'utf8');
var datarjo = JSON.parse(data);

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "wilayah"
});

var dataWilayah;
con.connect(function (err) {

    if (err) throw err;
    con.query("SELECT bps_id_rajaongkir FROM data_wilayah", function (err, result, fields) {
        if (err) throw err;
        dataWilayah = result;

        var x;
        var total_data_updated = 1;
        for (x = 0; x < dataWilayah.length; x++) {
            //var cek = datarjo.findIndex(datarjo.subdistrict_id === dataWilayah[x].bps_id_rajaongkir);
            var cek = datarjo.filter(function (value) {
                return value.subdistrict_id === dataWilayah[x].bps_id_rajaongkir
            });
            if (cek.length !== 0) {
                //update ke DB
                var sql = "UPDATE data_wilayah " +
                    "SET type_kota = '"+cek[0].type+"', raja_id_prov = '"+cek[0].province_id+"', raja_prov = '"+cek[0].province+"', raja_id_city = '"+cek[0].city_id+"', raja_city = '"+cek[0].city+"', raja_id_subd = '"+cek[0].subdistrict_id+"', raja_subd = '"+cek[0].subdistrict_name+"'" +
                    "WHERE bps_id_rajaongkir = '"+cek[0].subdistrict_id+"'";

                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(total_data_updated + " record(s) updated");
                    total_data_updated = total_data_updated + 1;
                });
            }
        }
    });

});