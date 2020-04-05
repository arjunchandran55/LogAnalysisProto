import React from 'react'
import { Pagination } from 'semantic-ui-react'

interface PaginationSectionProps {
    totalPages: Number;
    defaultActivePage: Number
}

const PaginationSection = () => (// (props: PaginationSectionProps) => (
  <Pagination defaultActivePage={5} totalPages={10} />
)

export default PaginationSection