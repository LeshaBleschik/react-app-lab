import Button from "elements/button/Button"
import Input from "elements/input/Input"
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { changeAmount, removeCart } from "redux/actions"
import { getCartSelector } from "redux/selectors"
import { CartData } from "types"
import "./cart-page.scss"

type CartProps = {
  confirmWindowToggle: () => void
}

const CartPage = ({ confirmWindowToggle }: CartProps) => {
  const cart = useSelector(getCartSelector)
  const dispatch = useDispatch()
  let total

  if (cart?.length) {
    total = cart
      .reduce(
        (acc: number, item: CartData) => acc + item.amount * item.price,
        0
      )
      .toFixed(2)
  }

  const getDate = () => {
    const date = new Date()
    let mounth
    let day
    if (date.getMonth() <= 10) {
      mounth = `0${date.getMonth() + 1}`
    }
    if (date.getDate() < 10) {
      day = `0${date.getDate()}`
    }
    return `${day || date.getDate()}/${
      mounth || date.getMonth()
    }/${date.getFullYear()}`
  }

  return (
    <section className="cart_page">
      <h1 className="cart_page__title">Cart page</h1>
      {cart?.length ? (
        <div className="cart_page__wrapper">
          <table className="cart_page__table">
            <thead className="cart_page__head">
              <tr className="cart_page__th">
                <th>Name</th>
                <th>Platform</th>
                <th>Order date</th>
                <th>Amount</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item: CartData) => (
                <tr key={item.id} className="cart_page__tb">
                  <td>{item.name}</td>
                  <td>
                    <div className="cart_page__platform">
                      <select
                        name="platform"
                        id="platform"
                        className="cart_page__platform_inside"
                      >
                        {item.platform.map((platform: string) => (
                          <option key={platform} value={platform}>
                            {platform}
                          </option>
                        ))}
                      </select>
                      <i className="fas fa-sort-down" />
                    </div>
                  </td>
                  <td>{getDate()}</td>
                  <td>
                    <Input
                      type="number"
                      className="cart_page__amount"
                      onChange={(event) => {
                        if (Number(event.target.value) >= 1) {
                          dispatch(
                            changeAmount(item.id, Number(event.target.value))
                          )
                        }
                      }}
                      value={item.amount}
                    />
                  </td>
                  <td>{item.price}$</td>
                  <td>
                    <button
                      onClick={() => {
                        dispatch(removeCart(item))
                      }}
                      className="cart_page__remove"
                    >
                      <i className="fas fa-trash cart_page__trash_icon" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart_page__buy_segment">
            <div className="cart_page__balance">Games cost: {total}$</div>
            <div className="cart_page__balance">Your balance: 68.39$</div>
            <Button
              title="Buy"
              className="cart_page__buy"
              onClick={() => confirmWindowToggle()}
            />
          </div>
        </div>
      ) : (
        <p className="cart_page__empty_cart">
          There is nothing on the cart yet.
        </p>
      )}
    </section>
  )
}

export default CartPage
