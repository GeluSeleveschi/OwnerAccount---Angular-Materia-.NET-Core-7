using Contracts;
using Entities;

namespace Repository
{
    public class RepositoryWrapper: IRepositoryWrapper
    {
        private RepositoryContext _repositoryContext;
        private IOwnerRepository _ownerRepo;
        private IAccountRepository _accountRepo;

        public IOwnerRepository Owner
        {
            get
            {
                if (_ownerRepo == null)
                {
                    _ownerRepo = new OwnerRepository(_repositoryContext);
                }

                return _ownerRepo;
            }
        }

        public IAccountRepository Account
        {
            get
            {
                if (_accountRepo == null)
                {
                    _accountRepo = new AccountRepository(_repositoryContext);
                }

                return _accountRepo;
            }
        }

        public RepositoryWrapper(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }

        public void Save()
        {
            _repositoryContext.SaveChanges();
        }
    }
}
