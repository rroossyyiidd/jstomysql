var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "wilayah"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE BPS (bps_prov VARCHAR(255), bps_kota VARCHAR(255), bps_kecamatan VARCHAR(255), bps_rajoid VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });

    var fs = require('fs');

    var data = fs.readFileSync('../datarjo.json','utf8');
    var lala = JSON.parse(data);

    var total_prov;
    var total_kota;
    var total_kec;
    var total_data_inserted = 1;
    for (total_prov = 0; total_prov < lala.length; total_prov++) {
        console.log('no.', total_prov, lala[total_prov].nama);
        for (total_kota = 0; total_kota < lala[total_prov].kota.length; total_kota++) {
            //lala[total_prov].kota.length
            //console.log("total kota: ", total_kota, lala[total_prov].kota[total_kota].nama, lala[total_prov].nama);
            for (total_kec = 0; total_kec < lala[total_prov].kota[total_kota].kecamatan.length; total_kec++) {
                // lala[total_prov].kota[total_kota].kecamatan.length
                //console.log('total kec', lala[total_prov].kota[total_kota].kecamatan.length, lala[total_prov].kota[total_kota].kecamatan[total_kec].nama);

                //INSERT KE DB
                var insert = "INSERT INTO BPS (bps_prov, bps_kota, bps_kecamatan, bps_rajoid) VALUES ('"+lala[total_prov].nama+"', '"+lala[total_prov].kota[total_kota].nama+"','"+lala[total_prov].kota[total_kota].kecamatan[total_kec].nama+"','"+lala[total_prov].kota[total_kota].kecamatan[total_kec].rajaongkir_id+"')";
                con.query(insert, function (err, result) {
                    if (err) throw err;
                    console.log("record inserted", total_data_inserted);

                    total_data_inserted = total_data_inserted + 1;
                });
            }
        }
    }
});