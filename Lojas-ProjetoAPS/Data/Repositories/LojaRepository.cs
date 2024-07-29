using Domain.Contracts;
using Data.Abstractions;
using Data.Context;

namespace Data.Repositories;

public class LojaRepository:BaseRepository<Domain.Entities.Loja>, ILojaRepository
{
    public LojaRepository(LojaDbContext context) : base(context)
    {
    }
}