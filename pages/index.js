import MeetupList from '@/components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup!'
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 10, 12345 Some City',
    description: 'This is a second meetup!'
  },
  {
    id: 'm3',
    title: 'A Third Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 15, 12345 Some City',
    description: 'This is a third meetup!'
  }
]

const HomePage = (props) => {
  return (
    <MeetupList meetups={props.meetups} />
  )
}

export async function getStaticProps() {
  // The code here is executed during the build process and not during the runtime on the server and not on the client side!!! Here you can connect to a DB, access file on the server, etc. and returns an object, that has a props property that contains the data that will be passed to the component.
  return {
    props: {
      meetups: DUMMY_MEETUPS
    },
    revalidate: 10 // To re-generate every 10 seconds on the seconds if there are requests.
  }
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API and run code on the server, not during build time, and not on the client side, only on the server side.
//   // There is no need to revalidate, because it runs for every request.
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export default HomePage;
