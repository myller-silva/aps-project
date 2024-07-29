using Domain.Contracts;
using Domain.Entities;
using Data.Abstractions;
using Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories;

public class DescontoRepository : BaseRepository<Desconto>, IDescontoRepository
{
    public DescontoRepository(LojaDbContext context) : base(context)
    {
    }

    public async Task<List<Desconto>> ObterDescontosCliente(int lojaId, int usuarioId)
    {
        var query = Context.Descontos
            .AsQueryable()
            .Include(x => x.Produto)
            .ThenInclude(p => p!.Estoques);

        return await query
            .Where(x => x.UsuarioId == usuarioId)
            .Where(x => x.Produto!.Estoques.Any(e => e.LojaId == lojaId))
            .ToListAsync();
    }
}