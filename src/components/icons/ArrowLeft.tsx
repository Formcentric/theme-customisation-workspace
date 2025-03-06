import React from 'react'

export const ArrowLeft: React.FC<React.SVGProps<SVGSVGElement>> = ({ ...props }) => {
    return (
        <svg
            width='14px'
            height='14px'
            viewBox='0 0 20 20'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            {...props}
        >
            <g
                id='icon-/-arrow-left'
                stroke='none'
                stroke-width='1'
                fill='none'
                fill-rule='evenodd'
            >
                <rect
                    id='Rectangle'
                    x='0'
                    y='0'
                    width='20'
                    height='20'
                ></rect>
                <path
                    d='M9.94644661,4 C10.2126948,4.26624822 10.2368992,4.68288319 10.0190598,4.97647445 L9.94641007,5.06062363 L9.94641007,5.06062363 L5.75678644,9.24966991 L15.9464466,9.24997737 C16.3606638,9.24998987 16.6964466,9.58578278 16.6964466,10 C16.6964466,10.3796843 16.4143012,10.69347 16.0482367,10.743131 L15.9464466,10.7499774 L15.9464466,10.7499774 L5.75678644,10.7496699 L9.94644716,14.9393393 C10.2393402,15.2322329 10.2393399,15.7071067 9.94644661,16 C9.65355339,16.2928932 9.17867966,16.2928932 8.88578644,16 L3.59289322,10.7071068 C3.20236893,10.3165825 3.20236893,9.68341751 3.59289322,9.29289322 L8.88578644,4 C9.17867966,3.70710678 9.65355339,3.70710678 9.94644661,4 Z'
                    id='Path'
                    fill='#473F7D'
                    fill-rule='nonzero'
                ></path>
            </g>
        </svg>
    )
}

export default ArrowLeft
