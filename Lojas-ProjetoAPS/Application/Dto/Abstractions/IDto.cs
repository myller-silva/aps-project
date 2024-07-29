using System.Linq.Expressions;

namespace Application.Dto.Abstractions;

public interface IDto<T>
{
    public Expression<Func<T, bool>> Filtro();
}
