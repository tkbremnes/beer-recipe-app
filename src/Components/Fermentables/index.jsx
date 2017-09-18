import React, { Component } from 'react';

class Fermentables extends Component {
  render() {
    let totalWeight = 0;
    this.props.fermentables.forEach((fermentable) => {
      totalWeight += parseInt(fermentable.weight, 10);
    });

    return (
      <table className="zebra">
        <thead className="input-row">
          <tr>
            <td className="weight"><brui-label-text></brui-label-text></td>
            <td className="name"><brui-label-text></brui-label-text></td>
            <td className="color"><brui-label-text></brui-label-text></td>
            <td className="total"></td>
          </tr>
        </thead>
        <tbody>

          { this.props.fermentables.map((_fermentable) => {
            const weight = _fermentable.weight;
            const name = _fermentable.fermentable.name;
            const color = _fermentable.fermentable.color;

            const percentageOfMaltBill = Math.round((_fermentable.weight / totalWeight) * 100);
            const key = `${weight}-${name}-${color}`

            return (
              <tr key={ key }>
                <td className="denom-cell weight">
                  <p className="text-content">
                    {weight}<span className="denom">g</span>
                  </p>
                </td>

                <td>
                  <p className="text-content">
                    {name}
                  </p>
                </td>

                <td className="denom-cell color">
                  <p className="text-content">
                    {color}<span className="denom">SRM</span>
                  </p>
                </td>

                <td className="denom-cell total">
                  <p className="text-content">
                    {percentageOfMaltBill}<span className="denom">%</span>
                  </p>
                </td>
              </tr>
            )
          }) }
        </tbody>
      </table>
    )
  }
}

export default Fermentables;
