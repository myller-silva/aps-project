using System.Linq.Expressions;
using Domain.Contracts;
using Domain.Entities;
using Data.Abstractions;
using Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories;

public class EstoqueRepository: BaseRepository<Estoque>, IEstoqueRepository
{
    public EstoqueRepository(LojaDbContext context) : base(context)
    {
    }
    
    public new async Task<List<Estoque>> Get(Expression<Func<Estoque, bool>> predicate)
    {
        var queryable = Context.Estoques.AsQueryable()
            .Include(x => x.Produto)
            .Include(x => x.Loja)
            .Where(predicate);
        return await queryable.ToListAsync();
    }

    public new async Task<Estoque?> Get(int id)
    {
        var queryable = Context.Estoques.AsQueryable()
            .Include(x=>x.Loja)
            .Include(x=>x.Produto)
            .Where(x=>x!.Id == id);
        return await queryable.FirstOrDefaultAsync();
    }
}