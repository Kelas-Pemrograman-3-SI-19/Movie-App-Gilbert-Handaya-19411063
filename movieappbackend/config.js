const requestResponse = {
  gagal: (pesan) => {
    return {
      sukses: false,
      pesan: pesan
    }
  },
  sukses: (pesan) => {
    return {
      sukses: true,
      pesan: pesan
    }
  },
  serverError: {
    sukses: false,
    pesan: 'Server Problem'
  },
  suksesLogin: (data) => {
    return {
      sukses: true,
      pesan: 'Login Sucessful',
      data: data
    }
  },
  suksesWithData: (data) => {
    return {
      sukses: true,
      pesan: 'Data Loaded Successfuly',
      data: data
    }
  }
}
module.exports = { requestResponse }