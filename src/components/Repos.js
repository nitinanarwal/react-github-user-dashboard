import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  // Setup data for chart
  const languages = repos.reduce((total, repo) => {
    const { language, stargazers_count } = repo;
    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    return total;
  }, {});
  // Top five used Languages (Pie chart)
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  // Stars Per Languages (Doughnut chart)
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((lang) => {
      return { ...lang, value: lang.stars };
    })
    .slice(0, 5);

  //Stars, Forks
  let { stars, forks } = repos.reduce(
    (total, repo) => {
      const { stargazers_count, name, forks } = repo;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[stargazers_count] = { label: name, value: forks };
      return total;
    },
    { stars: {}, forks: {} }
  );
  //console.log(stars);

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  // Dummy Data
  // const chartData = [
  //   {
  //     label: 'HTML',
  //     value: '290',
  //   },
  //   {
  //     label: 'CSS',
  //     value: '260',
  //   },
  //   {
  //     label: 'Javascript',
  //     value: '180',
  //   },
  // ];
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={mostUsed} />
        <div>
          <Column3D data={stars} />
        </div>
        <Doughnut2D data={mostPopular} />
        <div>
          <Bar3D data={forks} />
        </div>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
