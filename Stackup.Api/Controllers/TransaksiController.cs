using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class TransaksiController : ControllerBase
{
    private readonly DbManager _dbManager;
    Response response = new Response();

    public TransaksiController(IConfiguration configuration) {
        _dbManager = new DbManager(configuration);
    }

    // GET: api/Nilai
    [HttpGet]
    public IActionResult GetTransaksi()
    {
        try {
            var transaksiList = _dbManager.GetAllTransaksis();
            response.status = 200;
            response.message = "Success";
            response.data = transaksiList;
        }catch(Exception ex) {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    [HttpPost("CreateTransaksi")]
    public IActionResult ProcessTransaction([FromBody] transaksiInput transaksi)
    {
        try
        {
            if (_dbManager.ProsesTransaksi(transaksi) == true)
            {
                response.status = 200;
                response.message = "Transaksi berhasil diproses.";
            }
            else
            {
                response.status = 400;
                response.message = "Maaf transaksi gagal. Pastikan stok masih tersedia";
            }
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
   
    [HttpPut("UpdateTransaksi")]
    public IActionResult UpdateTransaksi(int id, [FromBody] Transaksi transaksi)
    {
        try
        {
            int result = _dbManager.UpdateDataTransaksi(id, transaksi);
            if (result > 0)
            {
                response.status = 200;
                response.message = "Transaksi updated successfully.";
                response.data = null;
                return Ok(response);
            }
            else
            {
                response.status = 404;
                response.message = "Transaksi not found or not updated.";
                response.data = null;
                return NotFound(response);
            }
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
            response.data = null;
            return StatusCode(500, response);
        }
    }

    [HttpDelete("DeleteTransaksi")]
    public IActionResult DeleteTransaksi(int id)
    {
        try
        {
            bool success = _dbManager.DeleteTransaksi(id);
            if (success)
            {
                response.status = 200;
                response.message = "Transaksi deleted successfully.";
                response.data = null;
                return Ok(response);
            }
            else
            {
                response.status = 404;
                response.message = "Transaksi not found.";
                response.data = null;
                return NotFound(response);
            }
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
            response.data = null;
            return StatusCode(500, response);
        }
    }

    //GET_By_id
    [HttpGet("GetTransaksiById")]
    public IActionResult GetById(int id)
    {
        try {
            var getbyidList = _dbManager.GetById(id);
            response.status = 200;
            response.message = "Success";
            response.data = getbyidList;
        }catch(Exception ex) {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    //GET_By_tanggal
    [HttpGet("GetTransaksiByTanggal")]
    public IActionResult GetByTanggal(string created_at)
    {
        try {
            var getbyidList = _dbManager.GetByTanggal(created_at);
            response.status = 200;
            response.message = "Success";
            response.data = getbyidList;
        }catch(Exception ex) {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
}
