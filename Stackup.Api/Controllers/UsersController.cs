using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly DbManager _dbManager;
    Response response = new Response();

    public UsersController(IConfiguration configuration)
    {
        _dbManager = new DbManager(configuration);
    }

    // GET: api/users
    [HttpGet]
    public IActionResult GetAllUsers()
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.GetAllUsers();
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    //GET_By_UserId
    [HttpGet("GetUserById")]
    public IActionResult GetUserByID(int id_user)
    {
        try {
            var getuserbyidList = _dbManager.GetUserById(id_user);
            response.status = 200;
            response.message = "Success";
            response.data = getuserbyidList;
        }catch(Exception ex) {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    
    //CREATE-Post
    [HttpPost("insertUser")]
    public IActionResult CreateUsers([FromBody] Users users){
        try{
            response.status = 200;
            response.message = "Succes";
            _dbManager.CreateUsers(users);
        }catch(Exception ex) {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // // GET: api/users/role/{role}
    // [HttpGet("{role}")]
    // public IActionResult GetByRole(string role)
    // {
    //     try
    //     {
    //         var getbyroleList = _dbManager.GetByRole(role);
    //         response.status = 200;
    //         response.message = "Success";
    //         response.data = getbyroleList;
    //     }
    //     catch (Exception ex)
    //     {
    //         response.status = 500;
    //         response.message = ex.Message;
    //     }
    //     return Ok(response);
    // }


    // PUT: api/users/{id_user}
    [HttpPut("updateUser{id_user}")]
    public IActionResult UpdateUsers(int id_user, [FromBody] Users users)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            _dbManager.UpdateUsers(id_user, users);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // DELETE: api/users/{id_user}
    [HttpDelete("deleteUser{id_user}")]
    public IActionResult DeleteUsers(int id_user)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            _dbManager.DeleteUsers(id_user);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
}
