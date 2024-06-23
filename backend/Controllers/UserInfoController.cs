using System;
using Microsoft.AspNetCore.Mvc;
using Services;
using Models;

namespace Controllers; 

[ApiController]
[Route("api/[controller]")]
public class UserInfoController : Controller
{
    private readonly IUserInfoService _userInfoService;

    public UserInfoController(IUserInfoService userInfoService)
    {
        _userInfoService = userInfoService;
    }

    // GET: api/UserInfo/
    [HttpGet("{userEmail}")]
    public async Task<List<UserInfo>> Get(string userEmail) { 
        return await _userInfoService.GetUserInfoByEmailAsync(userEmail);
    }
    // GET: api/Userinfo/AllUserInfo
    [HttpGet]
    [Route("AllUserInfo")]
    public async Task<List<UserInfo>> GetAll() { 
        return await _userInfoService.GetAllUserInfoAsync();
    }

    // POST: api/UserInfo
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] UserInfo userInfo) { 
        await _userInfoService.CreateUserInfoAsync(userInfo);
        return CreatedAtAction(nameof(Get), new { id = userInfo._id }, userInfo);
    }

    // PUT: api/UserInfo/{userEmail}
    [HttpPut("{userEmail}")]
    public async Task<IActionResult> UpdateUserInfoAsync(string userEmail, [FromBody] object userInfo) {
        await _userInfoService.UpdateUserInfoAsync(userEmail, userInfo);
        return NoContent();
    }

    // DELETE: api/UserInfo/{userEmail}
    [HttpDelete("{userEmail}")]
    public async Task<IActionResult> Delete(string userEmail) { 
        await _userInfoService.DeleteUserInfoAsync(userEmail);
        return NoContent();
    }
}