var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "wilayah"
});

var dataWilayah;
con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM data_wilayah where raja_id_prov is not null", function (err, result, fields) {
        if (err) throw err;
        dataWilayah = result;

        var x;
        var total_data_checked = 1;
        for (x = 0; x < dataWilayah.length; x++) {
            //dataWilayah.length
            var kec_bps = dataWilayah[x].bps_kecamatan.trim();
            var kec_rajo = dataWilayah[x].raja_subd.trim();
            if (kec_bps.toLowerCase() === kec_rajo.toLowerCase() && dataWilayah[x].bps_id_rajaongkir === dataWilayah[x].raja_id_subd) {
                var sql = "UPDATE data_wilayah SET valid = 'benar' WHERE id = " + dataWilayah[x].ID + "";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(total_data_checked + " record(s) updated");
                    total_data_checked = total_data_checked + 1;
                });
            } else {
                var sql2 = "UPDATE data_wilayah SET valid = 'salah' WHERE id = " + dataWilayah[x].ID + "";
                con.query(sql2, function (err, result) {
                    if (err) throw err;
                    console.log(total_data_checked + " record(s) updated");
                    total_data_checked = total_data_checked + 1;
                });
            }
        }
    });
});