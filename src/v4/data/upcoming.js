// The upcoming event shown in the Home pop-up and the highlight strip on the main pages. Change it here.
// Details from the Winter School flyer and the School of Public Policy notice (spp.iitd.ac.in/news).
export const UPCOMING = {
  id: '2027-01-winter-school',
  to: '/v4/news-events#2027-01-winter-school',
  name: 'Winter School 2027',
  title: 'Winter School 2027: Nature-based Solutions for Resilience in a Warming World',
  subtitle: 'Nature-based Solutions for Resilience in a Warming World',
  when: '11–13 January 2027',
  where: 'R&I Park, IIT Delhi',
  status: 'Applications closed on 15 November 2026',
  flyer: '/assets/photos/events/2027-01-winter-school-flyer.jpg',
  flyerSm: '/assets/photos/events/2027-01-winter-school-flyer-sm.jpg',
  pdf: '/assets/docs/winter-school-2027-flyer.pdf',
  // the event stops being promoted the day after it ends
  until: '2027-01-13',
};

export const upcomingActive = () => {
  const todayIST = new Date(Date.now() + 19800000).toISOString().slice(0, 10);
  return todayIST <= UPCOMING.until;
};
