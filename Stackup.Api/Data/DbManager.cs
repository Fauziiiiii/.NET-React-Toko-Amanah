using System.Data;
using System.Drawing;
using MySql.Data.MySqlClient;
using Mysqlx.Connection;

public class DbManager
{
    private readonly string connectionString;

    public DbManager(IConfiguration configuration)
    {
        connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    // Method Users
    // GET
    public List<Users> GetAllUsers(){
        List<Users> usersList = new List<Users>();
        try{
            using (MySqlConnection connection = new MySqlConnection(connectionString)){
                string query = "SELECT * FROM users";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader()){
                    while (reader.Read()){
                        Users users  = new Users{
                            id_user = Convert.ToInt32(reader["Id_user"]),
                            nama = reader["Nama"].ToString(),
                            alamat = reader["Alamat"].ToString(),
                            role =reader["Role"].ToString(),
                        };
                        usersList.Add(users);
                    }
                }
            }
        }
        catch (Exception ex){
            Console.WriteLine(ex.Message);
        }
        return usersList;
    }

    //GetUserById
    public List<GetUserById> GetUserById(int id_user)
    {
        List<GetUserById> getuserbyidList = new List<GetUserById>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT nama, alamat, role FROM users WHERE id_user LIKE @Id_user";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                command.Parameters.AddWithValue("@Id_user", "%" + id_user + "%");
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        GetUserById getuserbyid = new GetUserById{
                            nama = reader["nama"].ToString(),
                            alamat = reader["alamat"].ToString(),
                            role = reader["role"].ToString()
                        };
                        getuserbyidList.Add(getuserbyid);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return getuserbyidList;
    }

    // //GetByRole
    // public List<GetByRole> GetByRole(string role)
    // {
    //     List<GetByRole> getbyroleList = new List<GetByRole>();
    //     try
    //     {
    //         using (MySqlConnection connection = new MySqlConnection(connectionString))
    //         {
    //             string query = "SELECT role, nama FROM users WHERE role LIKE @Role";
    //             MySqlCommand command = new MySqlCommand(query, connection);
    //             connection.Open();
    //             command.Parameters.AddWithValue("@Role", "%" + role + "%");
    //             using (MySqlDataReader reader = command.ExecuteReader())
    //             {
    //                 while (reader.Read())
    //                 {
    //                     GetByRole getbyrole = new GetByRole
    //                     {
    //                         role = reader["role"].ToString(),
    //                         nama = reader["nama"].ToString(),
    //                     };
    //                     getbyroleList.Add(getbyrole);
    //                 }
    //             }
    //         }
    //     }
    //     catch (Exception ex)
    //     {
    //         Console.WriteLine(ex.Message);
    //     }
    //     return getbyroleList;
    // }

    //CREATE_User
    public int CreateUsers(Users users){
        using (MySqlConnection connection = new MySqlConnection(connectionString)){
            string query = "INSERT INTO users (nama, alamat, role) VALUES (@Nama, @Alamat, @Role)";
            using (MySqlCommand command = new MySqlCommand(query, connection)){
                command.Parameters.AddWithValue("@Nama", users.nama);
                command.Parameters.AddWithValue("@Alamat", users.alamat);
                command.Parameters.AddWithValue("@Role", users.role);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    // //Method ini akan mengecek apakah data sudah ada atau belum
    // public int GetAllUsers(Users users) {
    //     int count = 0;
    //     using (MySqlConnection connection =new MySqlConnection(connectionString)) {
    //         string query = "SELECT count(*) AS count FROM users WHERE nama = @Nama AND alamat = @Alamat";
    //         using (MySqlCommand command = new MySqlCommand(query, connection)) {
    //             command.Parameters.AddWithValue("@Nama",users.nama);
    //             command.Parameters.AddWithValue("@Alamat",users.alamat);

    //             connection.Open();

    //             using (MySqlDataReader reader = command.ExecuteReader()) {
    //                 while (reader.Read()) {
    //                     count = Convert.ToInt32(reader["count"]);
    //                 }
    //             }
    //         }
    //     }
    //     return count;
    // }

    //UPDATE Jika Name sama
    // public int UpdateUser(Users users) {
    //     using (MySqlConnection connection = new MySqlConnection(connectionString)){
    //         // string query = "UPDATE users set nama = @Nama, alamat = @Alamat WHERE id_user = @id_user";
    //         string query = "UPDATE users set nama = @Nama, alamat = @Alamat WHERE nama = @Nama AND alamat = @Alamat";
    //         using (MySqlCommand command = new MySqlCommand(query, connection)){
    //             command.Parameters.AddWithValue("@Nama", users.nama);
    //             command.Parameters.AddWithValue("@Alamat", users.alamat);

    //             connection.Open();
    //             try {
    //                 return command.ExecuteNonQuery();
    //             } catch (MySqlException ex) {
    //                 Console.WriteLine($"Error updating nilai : {ex.Message}");
    //                 return -1;
    //             }
                
    //         }
    //     }
    // }

    //UPDATE 
    public int UpdateUsers(int id_user, Users users){
        using (MySqlConnection connection = new MySqlConnection(connectionString)){
            string query = "UPDATE users SET nama = @Nama, alamat = @Alamat, role = @Role WHERE id_user = @Id_user";
            using (MySqlCommand command = new MySqlCommand(query, connection)){
                command.Parameters.AddWithValue("@Nama", users.nama);
                command.Parameters.AddWithValue("@Alamat", users.alamat);
                command.Parameters.AddWithValue("@Role", users.role);
                command.Parameters.AddWithValue("@Id_user", id_user);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    //DELETE
    public int DeleteUsers(int id_user){
        using (MySqlConnection connection = new MySqlConnection(connectionString)){
            string query = "DELETE FROM users WHERE id_user = @Id_user";
            using (MySqlCommand command = new MySqlCommand(query, connection)){
                command.Parameters.AddWithValue("@Id_user", id_user);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }    

    // Method Produk
    public List<Produk> GetAllProduk()
    {
        List<Produk> produkList = new List<Produk>();
        try
        {
            using(MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM produk";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                using(MySqlDataReader reader = command.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        Produk produk = new Produk
                        {
                            id_produk = Convert.ToInt32(reader["id_produk"]),
                            nama_produk = reader["nama_produk"].ToString(),
                            harga_satuan = Convert.ToInt32(reader["harga_satuan"]),
                            stok = Convert.ToInt32(reader["stok"]),
                            created_at = Convert.ToDateTime(reader["created_at"])
                        };
                        produkList.Add(produk);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return produkList;
    }

    public List<GetByProduk> GetByProduk(string nama_produk)
    {
        List<GetByProduk> getbyprodukList = new List<GetByProduk>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT nama_produk, harga_satuan, stok FROM produk WHERE nama_produk LIKE @Nama_produk";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                command.Parameters.AddWithValue("@Nama_produk", "%" + nama_produk + "%");
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        GetByProduk getbyproduk = new GetByProduk
                        {
                            nama_produk = reader["nama_produk"].ToString(),
                            harga_satuan = reader["harga_satuan"].ToString(),
                            stok = Convert.ToInt32(reader["stok"]),
                        };
                        getbyprodukList.Add(getbyproduk);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return getbyprodukList;
    }

    public List<Produk> GetProdukById(int id_produk)
    {
        List<Produk> getbyidlist = new List<Produk>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM produk WHERE id_produk = @Id_Produk";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                command.Parameters.AddWithValue("@Id_Produk", id_produk);
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Produk data = new Produk
                        {
                            id_produk = Convert.ToInt32(reader["id_produk"]),
                            nama_produk = reader["nama_produk"].ToString(),
                            harga_satuan = Convert.ToInt32(reader["harga_satuan"]),
                            stok = Convert.ToInt32(reader["stok"]),
                            created_at = Convert.ToDateTime(reader["created_at"])
                        };
                        getbyidlist.Add(data);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return getbyidlist;
    }

    public void CreateDataProduk(Produk produk)
    {
        try
        {
            using(MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "INSERT INTO produk (nama_produk, harga_satuan, stok) VALUES (@nama_produk, @harga_satuan, @stok)";
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@nama_produk", produk.nama_produk);
                command.Parameters.AddWithValue("@harga_satuan", produk.harga_satuan);
                command.Parameters.AddWithValue("@stok", produk.stok);

                connection.Open();
                command.ExecuteNonQuery();
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
    }

    public int UpdateDataProduk(int id_produk, Produk produk)
    {
        using (MySqlConnection connection = new MySqlConnection(connectionString)) {
            int hasil = produk.harga_satuan * produk.stok;
            string query = "UPDATE produk SET nama_produk = @Nama_produk, harga_satuan = @Harga_Satuan, stok = @Stok WHERE id_produk = @Id";
            using (MySqlCommand command = new MySqlCommand(query, connection)) {
                command.Parameters.AddWithValue("@Nama_Produk", produk.nama_produk);
                command.Parameters.AddWithValue("@Harga_Satuan", produk.harga_satuan);
                command.Parameters.AddWithValue("@Stok", produk.stok);
                command.Parameters.AddWithValue("@Id", id_produk);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    public int DeleteDataProduk(int id_produk)
    {
        using(MySqlConnection connection = new MySqlConnection(connectionString))
        {
            string query = "DELETE FROM produk WHERE id_produk = @Id";
            using(MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Id", id_produk);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }


    // Method Transaksi
    public List<Transaksi> GetAllTransaksis()
    {
        List<Transaksi> transaksiList = new List<Transaksi>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM transaksi";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Transaksi transaksi = new Transaksi
                        {
                            id = Convert.ToInt32(reader["id"]),
                            id_produk = Convert.ToInt32(reader["id_produk"]),
                            nama_produk = reader["nama_produk"].ToString(),
                            jumlah = Convert.ToInt32(reader["jumlah"]),
                            harga_total = Convert.ToInt32(reader["harga_total"]),
                            id_user = Convert.ToInt32(reader["id_user"]),
                            created_at = Convert.ToDateTime(reader["created_at"]),
                        };
                        transaksiList.Add(transaksi);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return transaksiList;
    }

    //GetByTransaksi_id
    public List<GetByTransaksi> GetById(int id)
    {
        List<GetByTransaksi> getbytransaksiList = new List<GetByTransaksi>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM transaksi WHERE id = @Id";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                command.Parameters.AddWithValue("@Id", id);
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        GetByTransaksi getbytransaksi = new GetByTransaksi
                        {
                            id = Convert.ToInt32(reader["id"]),
                            id_produk = Convert.ToInt32(reader["id_produk"]),
                            nama_produk = reader["nama_produk"].ToString(),
                            jumlah = Convert.ToInt32(reader["jumlah"]),
                            harga_total = Convert.ToInt32(reader["harga_total"]),
                            id_user = Convert.ToInt32(reader["id_user"]),
                            created_at  = Convert.ToDateTime(reader["created_at"])
                        };
                        getbytransaksiList.Add(getbytransaksi);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return getbytransaksiList;
    }

    //GetByTransaksi_tanggal
    public List<GetByTransaksi> GetByTanggal(string created_at)
    {
        List<GetByTransaksi> getbytransaksiList = new List<GetByTransaksi>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM transaksi WHERE created_at = @Created_at";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                command.Parameters.AddWithValue("@Created_at", created_at);
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        GetByTransaksi getbytransaksi = new GetByTransaksi
                        {
                            id = Convert.ToInt32(reader["id"]),
                            id_produk = Convert.ToInt32(reader["id_produk"]),
                            nama_produk = reader["nama_produk"].ToString(),
                            jumlah = Convert.ToInt32(reader["jumlah"]),
                            harga_total = Convert.ToInt32(reader["harga_total"]),
                            id_user = Convert.ToInt32(reader["id_user"]),
                            created_at  = Convert.ToDateTime(reader["created_at"])
                        };
                        getbytransaksiList.Add(getbytransaksi);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return getbytransaksiList;
    }

    // public bool ProsesTransaksi(Transaksi transaksi)
    // {
    //     using (var connection = new MySqlConnection(connectionString))
    //     {
    //         connection.Open();
    //         using (var transaction = connection.BeginTransaction())
    //         {
    //             try
    //             {
    //                 // Membuat var untuk mengambil data produk berdasarkan inputan id produk pada proses transaksi
    //                 Produk produk = null;
    //                 string queryDataProduk = "SELECT * FROM produk WHERE id_produk = @Id_Produk";
    //                 using (var dataProduk = new MySqlCommand(queryDataProduk, connection, transaction))
    //                 {
    //                     dataProduk.Parameters.AddWithValue("@Id_Produk", transaksi.id_produk);
    //                     using (var reader = dataProduk.ExecuteReader())
    //                     {
    //                         while (reader.Read())
    //                         {
    //                             produk = new Produk
    //                             {
    //                                 id_produk = Convert.ToInt32(reader["id_produk"]),
    //                                 nama_produk = reader["nama_produk"].ToString(),
    //                                 harga_satuan = Convert.ToInt32(reader["harga_satuan"]),
    //                                 stok = Convert.ToInt32(reader["stok"]),
    //                                 created_at = Convert.ToDateTime(reader["created_at"])
    //                             };
    //                         }
    //                     }
    //                 }

    //                 var harga_total = transaksi.jumlah * produk.harga_satuan;

    //                 // proses update jumlah barang setelah jumlah transasi ditentukan
    //                 string queryUpdateProduk = "UPDATE produk SET stok = stok - @Jumlah WHERE id_produk = @Id_Produk";
    //                 using (var command = new MySqlCommand(queryUpdateProduk, connection, transaction))
    //                 {
    //                     command.Parameters.AddWithValue("@Id_Produk", transaksi.id_produk);
    //                     command.Parameters.AddWithValue("@Jumlah", transaksi.jumlah);
    //                     command.ExecuteNonQuery();
    //                 }

    //                 // proses tambah data transaksi
    //                 string queryTambahProduk = "INSERT INTO transaksi VALUES ('', @id_produk, @nama_produk, @jumlah, @harga_total, @id_user, @created_at)";
    //                 using (var command = new MySqlCommand(queryTambahProduk, connection, transaction))
    //                 {
    //                     command.Parameters.AddWithValue("@id_produk", transaksi.id_produk);
    //                     command.Parameters.AddWithValue("@nama_produk", produk.nama_produk);
    //                     command.Parameters.AddWithValue("@jumlah", transaksi.jumlah);
    //                     command.Parameters.AddWithValue("@harga_total", harga_total);
    //                     command.Parameters.AddWithValue("@id_user", transaksi.id_user);
    //                     command.Parameters.AddWithValue("@created_at", DateTime.Now);
    //                     command.ExecuteNonQuery();
    //                 }

    //                 transaction.Commit();
    //                 return true;
    //             }
    //             catch (Exception)
    //             {
    //                 transaction.Rollback();
    //                 return false;
    //             }
    //         }
    //     }
    // }

    public bool ProsesTransaksi(transaksiInput transaksi)
    {
        using (var connection = new MySqlConnection(connectionString))
        {
            connection.Open();
            using (var transaction = connection.BeginTransaction())
            {
                try
                {
                    // Mengambil data produk berdasarkan id_produk dari input transaksi
                    Produk produk = null;
                    string queryDataProduk = "SELECT * FROM produk WHERE id_produk = @Id_Produk";
                    using (var dataProduk = new MySqlCommand(queryDataProduk, connection, transaction))
                    {
                        dataProduk.Parameters.AddWithValue("@Id_Produk", transaksi.id_produk);
                        using (var reader = dataProduk.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                produk = new Produk
                                {
                                    id_produk = Convert.ToInt32(reader["id_produk"]),
                                    nama_produk = reader["nama_produk"].ToString(),
                                    harga_satuan = Convert.ToInt32(reader["harga_satuan"]),
                                    stok = Convert.ToInt32(reader["stok"]),
                                    created_at = Convert.ToDateTime(reader["created_at"])
                                };
                            }
                        }
                    }

                    var harga_total = transaksi.jumlah * produk.harga_satuan;

                    // Update jumlah barang setelah transaksi
                    string queryUpdateProduk = "UPDATE produk SET stok = stok - @Jumlah WHERE id_produk = @Id_Produk";
                    using (var command = new MySqlCommand(queryUpdateProduk, connection, transaction))
                    {
                        command.Parameters.AddWithValue("@Id_Produk", transaksi.id_produk);
                        command.Parameters.AddWithValue("@Jumlah", transaksi.jumlah);
                        command.ExecuteNonQuery();
                    }

                    // Tambah data transaksi
                    string queryTambahProduk = "INSERT INTO transaksi (id_produk, nama_produk, jumlah, harga_total, id_user, created_at) VALUES (@id_produk, @nama_produk, @jumlah, @harga_total, @id_user, @created_at)";
                    using (var command = new MySqlCommand(queryTambahProduk, connection, transaction))
                    {
                        command.Parameters.AddWithValue("@id_produk", transaksi.id_produk);
                        command.Parameters.AddWithValue("@nama_produk", produk.nama_produk);
                        command.Parameters.AddWithValue("@jumlah", transaksi.jumlah);
                        command.Parameters.AddWithValue("@harga_total", harga_total);
                        command.Parameters.AddWithValue("@id_user", transaksi.id_user);
                        command.Parameters.AddWithValue("@created_at", DateTime.Now);
                        command.ExecuteNonQuery();
                    }

                    transaction.Commit();
                    return true;
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    return false;
                }
            }
        }
    }


    // Not used

    public int UpdateDataTransaksi(int id, Transaksi transaksi)
    {
        using (MySqlConnection connection = new MySqlConnection(connectionString))
        {
            connection.Open();

            Produk produk = null;
            string queryDataProduk = "SELECT * FROM produk WHERE id_produk = @Id_Produk";

            using (var dataProduk = new MySqlCommand(queryDataProduk, connection))
            {
                dataProduk.Parameters.AddWithValue("@Id_Produk", transaksi.id_produk);
                
                using (var reader = dataProduk.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        produk = new Produk
                        {
                            id_produk = Convert.ToInt32(reader["id_produk"]),
                            nama_produk = reader["nama_produk"].ToString(),
                            harga_satuan = Convert.ToInt32(reader["harga_satuan"]),
                            stok = Convert.ToInt32(reader["stok"]),
                            created_at = Convert.ToDateTime(reader["created_at"])
                        };
                    }
                }
            }

            if (produk == null)
            {
                // Produk dengan id_produk yang diberikan tidak ditemukan
                return 0;
            }

            var harga_total = transaksi.jumlah * produk.harga_satuan;

            // proses update jumlah barang ketika jumlah transaksi dirubah
            string queryUpdateProduk = "UPDATE produk SET stok = stok - @Jumlah WHERE id_produk = @Id_Produk";
            using (MySqlCommand command = new MySqlCommand(queryUpdateProduk, connection))
            {
                command.Parameters.AddWithValue("@Id_Produk", transaksi.id_produk);
                command.Parameters.AddWithValue("@Jumlah", transaksi.jumlah);
                command.ExecuteNonQuery();
            }

            string queryUpdateTransaksi = "UPDATE transaksi SET id_produk = @id_produk, nama_produk = @nama_produk, jumlah = @jumlah, harga_total = @harga_total, id_user = @id_user WHERE id = @Id";
            using (MySqlCommand command = new MySqlCommand(queryUpdateTransaksi, connection))
            {
                command.Parameters.AddWithValue("@id_produk", transaksi.id_produk);
                command.Parameters.AddWithValue("@nama_produk", produk.nama_produk);
                command.Parameters.AddWithValue("@jumlah", transaksi.jumlah);
                command.Parameters.AddWithValue("@harga_total", harga_total);
                command.Parameters.AddWithValue("@id_user", transaksi.id_user);
                command.Parameters.AddWithValue("@Id", id);

                return command.ExecuteNonQuery();
            }
        }
    }

    public bool DeleteTransaksi(int transaksiId)
    {
        using (var connection = new MySqlConnection(connectionString))
        {
            connection.Open();
            using (var transaction = connection.BeginTransaction())
            {
                try
                {
                    string deleteTransactionQuery = "DELETE FROM transaksi WHERE id = @Id";
                    using (var deleteTransactionCommand = new MySqlCommand(deleteTransactionQuery, connection, transaction))
                    {
                        deleteTransactionCommand.Parameters.AddWithValue("@Id", transaksiId);
                        deleteTransactionCommand.ExecuteNonQuery();
                    }

                    transaction.Commit();
                    return true;
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    return false;
                }
            }
        }
    }

     //METHOD Pelanggan
     public List<Pelanggan> GetAllPelanggan(){
        List<Pelanggan> pelanggansList = new List<Pelanggan>();
        try{
            using (MySqlConnection connection = new MySqlConnection(connectionString)){
                string query = "SELECT * FROM pelanggan";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader()){
                    while (reader.Read()){
                        Pelanggan pelanggans  = new Pelanggan{
                            id_pelanggan = Convert.ToInt32(reader["Id_pelanggan"]),
                            nama_pelanggan = reader["Nama_pelanggan"].ToString(),
                            email = reader["Email"].ToString(),
                            alamat = reader["Alamat"].ToString()
                            
                        };
                        pelanggansList.Add(pelanggans);
                    }
                }
            }
        }
        catch (Exception ex){
            Console.WriteLine(ex.Message);
        }
        return pelanggansList;
    }

    //GetUserById
    public List<GetPelangganById> GetPelangganById(int id_pelanggan)
    {
        List<GetPelangganById> getpelangganbyidList = new List<GetPelangganById>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT nama_pelanggan, email, alamat FROM pelanggan WHERE id_pelanggan LIKE @Id_pelanggan";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                command.Parameters.AddWithValue("@Id_pelanggan", "%" + id_pelanggan + "%");
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        GetPelangganById getpelangganbyid = new GetPelangganById{
                            nama_pelanggan = reader["Nama_pelanggan"].ToString(),
                            alamat = reader["Alamat"].ToString(),
                            email = reader["Email"].ToString()
                        };
                        getpelangganbyidList.Add(getpelangganbyid);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return getpelangganbyidList;
    }
    
    //CREATE_User
    public int CreatePelanggan(Pelanggan pelanggans){
        using (MySqlConnection connection = new MySqlConnection(connectionString)){
            string query = "INSERT INTO pelanggan (nama_pelanggan, email, alamat) VALUES (@Nama_pelanggan, @Email, @Alamat)";
            using (MySqlCommand command = new MySqlCommand(query, connection)){
                command.Parameters.AddWithValue("@Nama_pelanggan", pelanggans.nama_pelanggan);
                command.Parameters.AddWithValue("@Email", pelanggans.email);
                command.Parameters.AddWithValue("@Alamat", pelanggans.alamat);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

     //UPDATE 
    public int UpdatePelanggan(int id_pelanggan, Pelanggan pelanggans){
        using (MySqlConnection connection = new MySqlConnection(connectionString)){
            string query = "UPDATE pelanggan SET nama_pelanggan = @Nama_pelanggan,  email = @Email, alamat = @Alamat WHERE id_pelanggan = @Id_pelanggan";
            using (MySqlCommand command = new MySqlCommand(query, connection)){
                command.Parameters.AddWithValue("@Nama_pelanggan", pelanggans.nama_pelanggan);
                command.Parameters.AddWithValue("@Email", pelanggans.email);
                command.Parameters.AddWithValue("@Alamat", pelanggans.alamat);
                command.Parameters.AddWithValue("@Id_pelanggan", id_pelanggan);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    //DELETE
    public int DeletePelanggan(int id_pelanggan){
        using (MySqlConnection connection = new MySqlConnection(connectionString)){
            string query = "DELETE FROM pelanggan WHERE id_pelanggan = @Id_pelanggan";
            using (MySqlCommand command = new MySqlCommand(query, connection)){
                command.Parameters.AddWithValue("@Id_pelanggan", id_pelanggan);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }
    

}
