import { API_URL } from '../services/slot';

const mockAct = [{
  id: '1',
  startDate: '2024-08-01T13:00',
  isBooked: false
}, {
  id: '2',
  startDate: '2024-08-01T12:00',
  isBooked: true,
  bookedCustomerName: 'John Smith',
}]

export const mockFetch = async (url: string) => {
  switch (url) {
    case `${API_URL}/slots`: {
      return Promise.resolve({
        json : () => Promise.resolve({data: mockAct})
      })
    }
    case `${API_URL}/slots/2/book`: {
      return Promise.resolve({
        json : () => Promise.resolve([] )
      })
    }
    case `${API_URL}/slots/2/cancel-booking`: {
      return Promise.resolve({
        json : () => Promise.resolve([] )
      })
    }
  }
}
