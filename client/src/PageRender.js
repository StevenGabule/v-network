import React from 'react'
import { useParams } from 'react-router-dom'
import NotFound from './components/NotFound';

const generatePage = (pageName) => {
  const component = () => require(`./pages/${pageName}`).default;
  console.log("component", component);
  try {
    return React.createElement(component())
  } catch (err) {
    return <NotFound />
  }
}

const PageRender = () => {
  const {page,id} = useParams();
  console.log("page", page);
  let pageName = "";
  if (id) {
    pageName = `${page}/[id]`
  } else {
    pageName = `${page}`
  }
  return generatePage(pageName)
}

export default PageRender