const switchPorts = {
  // **************
  // Switch Ports
  // **************

  // GET List the switch ports for a switch
  getSwitchPorts(serial) {
    return this.meraki.get('devices/' + serial + '/switchPorts').then((res) => res.data);
  },

    // GET Return a switch port
    getSwitchPort(serial, portNum) {
    return this.meraki.get('devices/' + serial + '/switchPorts' + portNum).then((res) => res.data);
  },

    // PUT Update a switch port
    updateSwitchPort(serial, portNum, body) {
    return this.meraki.get('devices/' + serial + '/switchPorts' + portNum, body).then((res) => res.data);
  }
}

module.exports = switchPorts;