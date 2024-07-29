using Domain.Entities;


namespace Domain.Contracts;

public interface IUsuarioRepository : IBaseRepository<Usuario>
{
    Task<Usuario?> ObterPorEmail(string email);
}