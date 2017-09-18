import React, { Component } from 'react';

class Yeasts extends Component {
  render() {
    function renderBody(_yeasts) {
      return (
        <tbody>
          { _yeasts.map((_y, index) => {
            const name = _y.yeast.name;
            const id = _y.yeast.product_id;

            return (
              <tr key={ `${ index }-${ name }` }>
                <td><p className="text-content">{ id }</p></td>
                <td><p className="text-content">{ name }</p></td>
              </tr>
            )
          }) }
        </tbody>
      )
    }

    function renderHeader() {
      return (
        <thead>
          <tr>
            <td className="id"></td>
            <td className="name"></td>
          </tr>
        </thead>
      )
    }

    return (
      <table className="zebra">
        { renderHeader() }
        { renderBody(this.props.yeasts) }
      </table>
    )
  }
}

export default Yeasts;
