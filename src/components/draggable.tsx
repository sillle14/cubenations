import React, { FunctionComponent, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDrag, DragPreviewImage } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import { Dragged } from '../models/pieces'

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%',
        position: 'relative',
        zIndex: 0
    },
    draggable: {
        '& *': {cursor: 'grab'}
    }
})

type DraggableProps = {
    item: Dragged,
    draggable: boolean,
    previewImg?: string,
}

const Draggable: FunctionComponent<DraggableProps> = ({item, draggable, previewImg, children}) => {

    // let [data, setData] = useState('')
    
    const [, drag] = useDrag({
        item: item,
        canDrag: draggable,
    })
    const classes = useStyles()


    // var img = new Image()
    // if (previewImg) {
    //     var img = new Image()
    //     var canvas = document.createElement('canvas');
    //     img.src = previewImg || ''
    //     // TODO: Use the sizes
    //     img.height = 60
    //     img.width = 60
    //     // Create an empty canvas element
    //     var canvas = document.createElement("canvas");
    //     canvas.width = img.width;
    //     canvas.height = img.height;
    
    //     // Copy the image contents to the canvas
    //     var ctx = canvas.getContext("2d");
    //     ctx!.drawImage(img, 0, 0);
    
    //     // Get the data-URL formatted image
    //     // Firefox supports PNG and JPEG. You could check img.src to
    //     // guess the original format, but be aware the using "image/jpg"
    //     // will re-encode the image.
    //     // setDataUrl(canvas.toDataURL("image/png"))
    // }
    function getBase64Image(img: any) {
        // Create an empty canvas element
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
    
        // Copy the image contents to the canvas
        var ctx = canvas.getContext("2d");
        ctx!.drawImage(img, 0, 0);
    
        // Get the data-URL formatted image
        // Firefox supports PNG and JPEG. You could check img.src to
        // guess the original format, but be aware the using "image/jpg"
        // will re-encode the image.
        var dataURL = canvas.toDataURL("image/png");
        return dataURL;
    }

    useEffect(() => {
        console.log('rerender')
      }, [])

    return (
        <>
            {/* {!!data ? <DragPreviewImage connect={preview} src={data}/> : null} */}
            <div ref={drag} className={`${classes.root} ${draggable ? classes.draggable : ''}`}>{children}</div>
        </>
    )
}

export default Draggable