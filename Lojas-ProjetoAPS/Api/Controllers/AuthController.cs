using Application.Contracts;
using Application.Dto.Token;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("auth")]

public class AuthController : ControllerBase
{
    private readonly IUsuarioAuthService _usuarioAuthService;

    public AuthController(IUsuarioAuthService usuarioAuthService)
    {
        _usuarioAuthService = usuarioAuthService;
    }

    [HttpPost("token")]
    public async Task<IActionResult> Login(LoginUsuarioDto usuarioDto)
    {
        var result = await _usuarioAuthService.Login(usuarioDto);
        if (result == null)
        {
            return BadRequest();
        }

        return Ok(result);
    }
    
    [HttpPost("signup")]
    public async Task<IActionResult> Signup(SignupDto model)
    {
        try
        {
            var result = await _usuarioAuthService.SignupAsync(model);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

}