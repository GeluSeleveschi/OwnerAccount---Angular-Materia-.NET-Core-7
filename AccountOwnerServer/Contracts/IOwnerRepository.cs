using Entities.DataTransferObjects;
using Entities.Models;
using System.Dynamic;

namespace Contracts
{
    public interface IOwnerRepository : IRepositoryBase<Owner>
    {
        PagedList<ExpandoObject> GetAllOwners(OwnerParameters ownerParameters);
        ExpandoObject GetFilteredOwnerById(Guid ownerId, string fields);
        Owner GetOwnerById(Guid ownerId);
        Owner GetOwnerWithDetails(Guid ownerId);
        void CreateOwner(Owner owner);
        void UpdateOwner(Owner owner);
        void DeleteOwner(Owner owner);
        List<Owner> GetOwnersUsingPagination(int pageIndex, int pageSize);
        int GetAllOwnersCount();

    }
}
