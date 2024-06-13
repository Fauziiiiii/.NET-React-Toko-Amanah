using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class ProdukController : ControllerBase
{
    private readonly DbManager _dbManager;
    Response response = new Response();

    public ProdukController(IConfiguration configuration) {
        _dbManager = new DbManager(configuration);
    }

    // GET: api/Nilai
    [HttpGet]
    public IActionResult GetProduk()
    {
        try {
            var produkList = _dbManager.GetAllProduk();
            response.status = 200;
            response.message = "Success";
            response.data = produkList;
        }catch(Exception ex) {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    //GET_By_Produk
    [HttpGet("GetByProduk")]    
    public IActionResult GetByProduk(string nama_produk)
    {
        try {
            var getbyprodukList = _dbManager.GetByProduk(nama_produk);
            response.status = 200;
            response.message = "Success";
            response.data = getbyprodukList;
        }catch(Exception ex) {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    //GET_By_Produk
    [HttpGet("GetProdukById")]    
    public IActionResult GetProdukById(int id_produk)
    {
        try {
            var getbyprodukList = _dbManager.GetProdukById(id_produk);
            response.status = 200;
            response.message = "Success";
            response.data = getbyprodukList;
        }catch(Exception ex) {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // POST: api/Nilai
    [HttpPost("CreateProduk")]
    public IActionResult CreateProduk([FromBody] Produk produk)
    {
        try {
            _dbManager.CreateDataProduk(produk);
            response.status = 200;
            response.message = "Produk berhasil ditambahkan";
            response.data = null;
        }catch(Exception ex) {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    //
    [HttpPut("UpdateProduk")]
    public IActionResult UpdateProduk(int id_produk, [FromBody] Produk produk)
    {
        try {
            _dbManager.UpdateDataProduk(id_produk, produk);
            response.status = 200;
            response.message = "Produk berhasil diupdate";
            response.data = null;
        }catch(Exception ex) {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }


    [HttpDelete("DeleteProduk")]
    public IActionResult DeleteProduk(int id_produk)
    {
        try {
            _dbManager.DeleteDataProduk(id_produk);
            response.status = 200;
            response.message = "Produk berhasil dihapus";
            response.data = null;
        }catch(Exception ex) {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // Contoh method lain jika diperlukan
    // [HttpGet("GetIndeksNilaiByMateri")]
    // public IActionResult GetPesertaIndeksByMateri(int materi)
    // {
    //     try {
    //         response.status = 200;
    //         response.message = "Success";
    //         response.data = _dbManager.GetIndeksNilaiByMateri(materi);
    //     }catch(Exception ex) {
    //         response.status = 500;
    //         response.message = ex.Message;
    //     }
    //     return Ok(response);
    // }

    // [HttpGet("GetIndeksNilaiByPeserta")]
    // public IActionResult GetPesertaIndeksByPeserta(int peserta)
    // {
    //     try {
    //         response.status = 200;
    //         response.message = "Success";
    //         response.data = _dbManager.GetIndeksNilaiByPeserta(peserta);
    //     }catch(Exception ex) {
    //         response.status = 500;
    //         response.message = ex.Message;
    //     }
    //     return Ok(response);
    // }
}
