using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]

public class PelangganController : ControllerBase {
    private readonly DbManager _dbManager;
    Response response = new Response();

    public PelangganController(IConfiguration configuration) {
        _dbManager = new DbManager(configuration);
    }

    // GET: api/Nilai
    [HttpGet]
    public IActionResult GetAllPelanggan()
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.GetAllPelanggan();
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    //GET_By_UserId
    [HttpGet("GetPelangganById")]
    public IActionResult GetPelangganByID(int id_pelanggan)
    {
        try {
            var getpelangganbyidList = _dbManager.GetPelangganById(id_pelanggan);
            response.status = 200;
            response.message = "Success";
            response.data = getpelangganbyidList;
        }catch(Exception ex) {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    
    //CREATE-Post
    [HttpPost("insertPelanggan")]
    public IActionResult CreatePelanggan([FromBody] Pelanggan pelanggans){
        try{
            response.status = 200;
            response.message = "Succes";
            _dbManager.CreatePelanggan(pelanggans);
        }catch(Exception ex) {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // PUT: api/users/{id_user}
    [HttpPut("updatePelanggan{id_pelanggan}")]
    public IActionResult UpdatePelanggan(int id_pelanggan, [FromBody] Pelanggan pelanggans)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            _dbManager.UpdatePelanggan(id_pelanggan, pelanggans);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // DELETE: api/users/{id_user}
    [HttpDelete("deletePelanggan{id_pelanggan}")]
    public IActionResult DeletePelanggan(int id_pelanggan)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            _dbManager.DeletePelanggan(id_pelanggan);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
}