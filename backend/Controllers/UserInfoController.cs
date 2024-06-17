using System;
using Microsoft.AspNetCore.Mvc;
using Services;
using Models;

namespace Controllers; 

[Controller]
[Route("api/[controller]")]
public class UserInfoController : Controller
{
private readonly UserInfoService _userInfoService;

    public UserInfoController(UserInfoService userInfoService)
    {
        _userInfoService = userInfoService;
    }
    // GET: api/UserInfo
    [HttpGet]
    public async Task<List<UserInfo>> Get(string userEmail) { 
        return await _userInfoService.GetUserInfoByEmailAsync(userEmail);
    }

    // POST: api/UserInfo
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] UserInfo userInfo) { 
        await _userInfoService.CreateUserInfoAsync(userInfo);
        return CreatedAtAction(nameof(Get), new { id = userInfo.Id }, userInfo);
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