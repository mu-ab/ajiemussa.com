// import ListLayoutWithPagination from './ListLayoutWithPagination'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import BlogCard from '@/components/BlogList'
import Image from 'next/image'

import formatDateToCustomFormat from '../../scripts/formatDate'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

interface PaginationProps {
  totalPages: number
  currentPage: number
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }
  const MAX_DISPLAY: number = 5

  // return (
  //   <ListLayoutWithPagination
  //     posts={posts}
  //     initialDisplayPosts={initialDisplayPosts}
  //     pagination={pagination}
  //     title="All Posts"
  //   />
  // )
  // return (
  //   <>
  //     <BlogCard
  //       posts={posts}
  //       initialDisplayPosts={initialDisplayPosts}
  //       pagination={pagination}
  //       title="All Posts"
  //     />
  //     {pagination && pagination.totalPages > 1 && (
  //       <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
  //     )}
  //   </>
  // )
  return (
    <>
      <ul>
        {!posts.length && 'No posts found.'}
        {posts.slice(0, MAX_DISPLAY).map((post) => {
          const { slug, date, title, summary, images, readingTime, tags } = post

          return (
            <li
              key={slug}
              className="p-0 sm:p-6 border-b-2 border-gray-300 dark:border-gray-600  mb-6"
            >
              <article className="text-left flex flex-col justify-center items-center">
                <Link
                  href={`/blog/${slug}`}
                  className="flex justify-between gap-10 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label={`Read "${title}"`}
                >
                  {/* Left Side */}
                  <div className=" basis-3/4  flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-800 rounded-md overflow-hidden w-[20px] h-[20px] md:w-[25px] md:h-[25px]">
                        <Image src={images[0]} alt="thumbnail" width="25" height="25" />
                      </div>
                      <span className="text-[10px] md:text-[12px] align-middle text-gray-500 dark:text-gray-400">
                        {tags[0].toUpperCase()}
                      </span>
                    </div>
                    <h2 className="text-base font-medium leading-8 tracking-tight">
                      <div className="text-gray-900 dark:text-gray-100">{title}</div>
                    </h2>
                    <div className="text-sm md:prose max-w-none text-gray-500 dark:text-gray-400">
                      {summary}
                    </div>
                    <div className="pb-4 whitespace-nowrap text-xs flex items-center gap-[10px]  prose max-w-none text-gray-500 dark:text-gray-400">
                      <span>{author.toUpperCase()}</span>
                      <span className="font-extrabold relative -top-[4.5px]">.</span>
                      <span>{readingTime?.text?.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="">
                    <dl className="">
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-end text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        {/* <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time> */}
                        <time dateTime={date} className="text-xs md:text-sm ">
                          {formatDateToCustomFormat(date)}
                        </time>
                      </dd>
                    </dl>
                    <div className="mt-4 bg-slate-300 rounded-sm overflow-hidden">
                      <Image src={images[1]} alt="thumbnail images" width="150" height="200" />
                    </div>
                  </div>
                </Link>
              </article>
            </li>
          )
        })}
      </ul>
      {pagination && pagination.totalPages > 1 && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
