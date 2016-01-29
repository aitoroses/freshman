import {adt, dataConstructor} from '../src'
const {data, newtype, only, record} = adt

function putStrLn(o) {
  console.log("" + o)
}

function type(a) {
  let Klass = Object.getPrototypeOf(a).constructor
  return Klass
}

function is(Type, a) {
  return a instanceof Type
}

// ---

const BookInfo = data(type => {
  type('Book', record(field => {
    field('id', only(Number))
    field('title', only(String))
    field('authors', only(Array))
  }))
})

// Book :: Int -> String -> [String] -> BookInfo
const Book = BookInfo.Book

const myBook = Book( 9780135072455, "Algebra of Programming",
  ["Richard Bird", "Oege de Moor"])

// ---


// const CardHolder = String
// const CardNumber = String
// const Address = Array
// const CostumerID = String

// data BillingInfo = CreditCard CardNumber CardHolder Address
//                  | CashOnDelivery
//                  | Invoice CustomerID
//                    deriving (Show)

// const BillingInfo = data(type => {
//  type('CreditCard', record(field => {
//    field('cardNumber', only(CardNumber))
//    field('cardHolder', only(CardHolder))
//    field('address', only(Address))
//  }))
//  type('CashOnDelivery')
//  type('Invoice', record(field => {
//    field('customerId', only(CostumerID))
//  }))
// })

// CreditCard :: CardNumber -> CardHolder -> Address -> BillingInfo
// const CreditCard = BillingInfo.CreditCard

//putStrLn( CreditCard( "2901650221064486", "Thomas Gradgrind", ["Dickens", "England"]) )

// ---

// Haskell data type DSL


// Parse test

const BillingInfo = dataConstructor(`
  data BillingInfo = CreditCard CardNumber CardHolder Address
                   | CashOnDelivery
                   | Invoice CustomerID
`)

console.log(BillingInfo.CreditCard(1234, "Aitor", ["Calle de las maestras"]).toString())
