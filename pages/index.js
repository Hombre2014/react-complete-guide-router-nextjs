import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '@/components/meetups/MeetupList';
import { Fragment } from 'react';

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )
}

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.REACT_APP_MONGO_DB_STRING);
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();
  client.close();
  // The code here is executed during the build process and not during the runtime on the server and not on the client side!!! Here you can connect to a DB, access file on the server, etc. and returns an object, that has a props property that contains the data that will be passed to the component.
  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 1 // To re-generate every 10 seconds on the seconds if there are requests.
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
