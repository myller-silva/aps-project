using Application.Dto.Usuario;
using Domain.Entities;

namespace Application.Contracts;

public interface IUsuarioService : IBaseService<Usuario>
{
    Task<bool> Create(CreateUsuarioDto dto);
    Task<bool> Update(UpdateUsuarioDto dto);
}