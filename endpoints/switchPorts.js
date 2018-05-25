/**
 * Switch Ports
 * @module Switch_Ports
 */
const switchPorts = {

  /**
   * Return the switch ports for a switch
   * @memberof module:Switch_Ports
   * @param {*} serial 
   */
  getSwitchPorts(serial) {
    return this.meraki.get('devices/' + serial + '/switchPorts').then((res) => res.data);
  },

  /**
   * Return a switch port
   * @memberof module:Switch_Ports
   * @param {*} serial 
   * @param {*} portNum 
   */
  getSwitchPort(serial, portNum) {
    return this.meraki.get('devices/' + serial + '/switchPorts' + portNum).then((res) => res.data);
  },

  /**
   * Update a switch port
   * @memberof module:Switch_Ports
   * @param {*} serial 
   * @param {*} portNum 
   * @param {*} body 
   */
  updateSwitchPort(serial, portNum, body) {
    return this.meraki.get('devices/' + serial + '/switchPorts' + portNum, body).then((res) => res.data);
  }
}

module.exports = switchPorts;