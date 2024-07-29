using Application.Contracts;
using Application.Dto.Abstractions;
using Application.Dto.Produto;
using Domain.Contracts;
using Domain.Entities;

namespace Application.Services;

public class ProdutoService : IProdutoService
{
    private readonly IProdutoRepository _repository;

    public ProdutoService(IProdutoRepository repository)
    {
        _repository = repository;
    }


    public async Task<bool> Create(CreateProdutoDto dto)
    {
        return await _repository.Create(new Produto
        {
            Descricao = dto.Descricao,
            Preco = dto.Preco,
            Nome = dto.Nome
        });
    }

    public async Task<List<Produto>> Get(IDto<Produto> dto)
    {
        var response = await _repository.Get(dto.Filtro());
        return response;
    }

    public async Task<Produto?> Get(int id)
    {
        var response = await _repository.Get(id);
        return response;
    }

    public async Task<bool> Update(UpdateProdutoDto dto)
    {
        var response = await _repository.Get(dto.Id);
        if (response is null)
        {
            return false;
        }

        response.Nome = dto.Nome;
        response.Preco = dto.Preco;
        response.Descricao = dto.Descricao;

        return await _repository.Update(response);
    }

    public async Task<bool> Delete(int id)
    {
        var response = await _repository.Delete(id);
        return response;
    }
}