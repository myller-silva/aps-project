using Domain.Contracts;
using Domain.Entities;
using Data.Abstractions;
using Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories;

public class UsuarioRepository : BaseRepository<Usuario>, IUsuarioRepository
{
    public UsuarioRepository(LojaDbContext context) : base(context)
    {
    }

    public async Task<Usuario?> ObterPorEmail(string email)
    {
        var query = Context.Usuarios.AsQueryable();
        return await query.Where(x => x.Email == email).FirstOrDefaultAsync();
    }
}
