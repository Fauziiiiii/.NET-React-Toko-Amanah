// using System.Data;
// using System.Drawing;
// using MySql.Data.MySqlClient;
// using Mysqlx.Connection;

// public class DbManager
// {
//     private readonly string connectionString;

//     public DbManager(IConfiguration configuration)
//     {
//         connectionString = configuration.GetConnectionString("DefaultConnection");
//     }

//     public List<Produk> GetAllProduk()
//     {
//         List<Produk> produkList = new List<Produk>();
//         try
//         {
//             using(MySqlConnection connection = new MySqlConnection(connectionString))
//             {
//                 string query = "SELECT * FROM produk";
//                 MySqlCommand command = new MySqlCommand(query, connection);
//                 connection.Open();
//                 using(MySqlDataReader reader = command.ExecuteReader())
//                 {
//                     while(reader.Read())
//                     {
//                         Produk produk = new Produk
//                         {
//                             id_produk = Convert.ToInt32(reader["id_produk"]),
//                             nama_produk = reader["nama_produk"].ToString(),
//                             stok = Convert.ToInt32(reader["stok"]),
//                             created_at = Convert.ToDateTime(reader["created_at"])
//                         };
//                         produkList.Add(produk);
//                     }
//                 }
//             }
//         }
//         catch (Exception ex)
//         {
//             Console.WriteLine(ex.Message);
//         }
//         return produkList;
//     }

//     public List<Transaksi> GetAllTransaksis()
//     {
//         List<Transaksi> transaksiList = new List<Transaksi>();
//         try
//         {
//             using (MySqlConnection connection = new MySqlConnection(connectionString))
//             {
//                 string query = "SELECT * FROM transaksi";
//                 MySqlCommand command = new MySqlCommand(query, connection);
//                 connection.Open();
//                 using (MySqlDataReader reader = command.ExecuteReader())
//                 {
//                     while (reader.Read())
//                     {
//                         Transaksi transaksi = new Transaksi
//                         {
//                             id = Convert.ToInt32(reader["id"]),
//                             id_produk = Convert.ToInt32(reader["id_produk"]),
//                             nama_produk = reader["nama_produk"].ToString(),
//                             jumlah = Convert.ToInt32(reader["jumlah"]),
//                             id_user = Convert.ToInt32(reader["id_user"]),
//                             created_at = Convert.ToDateTime(reader["created_at"]),
//                         };
//                         transaksiList.Add(transaksi);
//                     }
//                 }
//             }
//         }
//         catch (Exception ex)
//         {
//             Console.WriteLine(ex.Message);
//         }
//         return transaksiList;
//     }

//     public void CreateDataProduk(Produk produk)
//     {
//         try
//         {
//             using(MySqlConnection connection = new MySqlConnection(connectionString))
//             {
//                 string query = "INSERT INTO produk (nama_produk, harga_satuan, stok) VALUES (@nama_produk, @harga_satuan, @stok)";
//                 MySqlCommand command = new MySqlCommand(query, connection);
//                 command.Parameters.AddWithValue("@nama_produk", produk.nama_produk);
//                 command.Parameters.AddWithValue("@harga_satuan", produk.harga_satuan);
//                 command.Parameters.AddWithValue("@stok", produk.stok);

//                 connection.Open();
//                 command.ExecuteNonQuery();
//             }
//         }
//         catch (Exception ex)
//         {
//             Console.WriteLine(ex.Message);
//         }
//     }

//     public int UpdateDataProduk(int id_produk, Produk produk)
//     {
//         using (MySqlConnection connection = new MySqlConnection(connectionString)) {
//             int hasil = produk.harga_satuan * produk.stok;
//             string query = "UPDATE produk SET nama_produk = @Nama_produk, harga_satuan = @Harga_Satuan, stok = @Stok WHERE id_produk = @Id";
//             using (MySqlCommand command = new MySqlCommand(query, connection)) {
//                 command.Parameters.AddWithValue("@Nama_Produk", produk.nama_produk);
//                 command.Parameters.AddWithValue("@Harga_Satuan", produk.harga_satuan);
//                 command.Parameters.AddWithValue("@Stok", produk.stok);
//                 command.Parameters.AddWithValue("@Id", id_produk);

//                 connection.Open();
//                 return command.ExecuteNonQuery();
//             }
//         }
//     }

//     public int DeleteDataProduk(int id_produk)
//     {
//         using(MySqlConnection connection = new MySqlConnection(connectionString))
//         {
//             string query = "DELETE FROM produk WHERE id_produk = @Id";
//             using(MySqlCommand command = new MySqlCommand(query, connection))
//             {
//                 command.Parameters.AddWithValue("@Id", id_produk);

//                 connection.Open();
//                 return command.ExecuteNonQuery();
//             }
//         }
//     }

//       public bool ProcessTransaction(Transaksi transaksi)
//     {
//         using (var connection = new MySqlConnection(connectionString))
//         {
//             connection.Open();
//             using (var transaction = connection.BeginTransaction())
//             {
//                 try
//                 {
//                     // Membuat var untuk mengambil data produk berdasarkan inputan id produk pada proses transaksi
//                     Produk produk = null;
//                     string query = "SELECT * FROM produk WHERE id_produk = @Id_Produk";
//                     using (var dataProduk = new MySqlCommand(query, connection, transaction))
//                     {
//                         dataProduk.Parameters.AddWithValue("@Id_Produk", transaksi.id_produk);
//                         using (var reader = dataProduk.ExecuteReader())
//                         {
//                             if (reader.Read())
//                             {
//                                 produk = new Produk
//                                 {
//                                     id_produk = Convert.ToInt32(reader["id_produk"]),
//                                     nama_produk = reader["nama_produk"].ToString(),
//                                     harga_satuan = Convert.ToInt32(reader["harga_satuan"]),
//                                     stok = Convert.ToInt32(reader["stok"]),
//                                     created_at = Convert.ToDateTime(reader["created_at"])
//                                 };
//                             }
//                         }
//                     }

//                     if (produk == null || produk.stok < transaksi.jumlah)
//                     {
//                         transaction.Rollback();
//                         return false;
//                     }

//                     var harga_total = transaksi.jumlah * produk.harga_satuan;

//                     string updateProductQuery = "UPDATE produk SET stok = stok - @quantity WHERE id_produk = @Id_Produk";
//                     using (var updateCommand = new MySqlCommand(updateProductQuery, connection, transaction))
//                     {
//                         updateCommand.Parameters.AddWithValue("@Id_Produk", transaksi.id_produk);
//                         updateCommand.Parameters.AddWithValue("@quantity", transaksi.jumlah);
//                         updateCommand.ExecuteNonQuery();
//                     }

//                     string insertTransactionQuery = "INSERT INTO transaksi (id_produk, nama_produk, jumlah, harga_total, id_user, created_at) VALUES (@id_produk, @nama_produk, @jumlah, @harga_total, @id_user, @created_at)";
//                     using (var insertCommand = new MySqlCommand(insertTransactionQuery, connection, transaction))
//                     {
//                         insertCommand.Parameters.AddWithValue("@id_produk", transaksi.id_produk);
//                         insertCommand.Parameters.AddWithValue("@nama_produk", produk.nama_produk);
//                         insertCommand.Parameters.AddWithValue("@jumlah", transaksi.jumlah);
//                         insertCommand.Parameters.AddWithValue("@harga_total", harga_total);
//                         insertCommand.Parameters.AddWithValue("@id_user", transaksi.id_user);
//                         insertCommand.Parameters.AddWithValue("@created_at", DateTime.Now);
//                         insertCommand.ExecuteNonQuery();
//                     }

//                     transaction.Commit();
//                     return true;
//                 }
//                 catch (Exception)
//                 {
//                     transaction.Rollback();
//                     return false;
//                 }
//             }
//         }
//     }
// }
