using Domain.Contracts;

namespace Application.Dto.Abstractions;

public interface IUpdateDto<T> where T : IEntity
{
    int Id { get; set; }
}