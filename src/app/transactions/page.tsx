import TransactionTable from '../components/organisms/TransactionTable';

const Transactions = () => {
    return (
        <div className='p-6'>
        <TransactionTable showInvoiceId={true} showAction={true} />
        </div>
    )
}

export default Transactions