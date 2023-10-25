import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import cls from './Editor.module.scss'
import { useEffect, useMemo, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Button, ColorPicker } from 'antd';
import { Color, ColorPickerProps } from 'antd/es/color-picker';

export const Editor = () => {

    const [color, setColor] = useState<Color | string>('#1677ff')
    const [formatHex, setFormatHex] = useState<ColorPickerProps['format']>('hex');

    const hexString = useMemo(
        () => (typeof color === 'string' ? color : color.toHexString()),
        [color],
    );

    const {
        editor,
        onReady,
    } = useFabricJSEditor()

    const addRectangle = (color: Color | string) => {

        const rect = new fabric.Rect({
            top: 300,
            left: 100,
            width: 100,
            height: 100,
            fill: hexString,
        })

        editor?.canvas.add(rect);
    }

    const addCircle = (color: Color | string) => {
        const circle = new fabric.Circle({
            top: 300,
            left: 100,
            radius: 20,
            fill: hexString,
        })

        editor?.canvas.add(circle);


    }

    const addText = (inputText: string) => {
        const text = new fabric.Text(inputText, {
            top: 300,
            left: 100,
            fontSize: 32,
            fill: hexString,
        })
        editor.canvas.add(text)
        // editor?.addText('Текст')
    }

    const onDelete = () => {
        editor?.deleteSelected();
    }

    const colorHandler = (color: any) => {
        console.log(color);
    }

    const inpRef = useRef(null);

    return (
        <div className={cls.editor}>
            <FabricJSCanvas className={cls.fabricCanvas} onReady={onReady} />
            {/* <canvas id="canvas" width="300" height="300"></canvas> */}

            <div className={cls.menu}>
                <Button onClick={() => addRectangle(color)}>Квадрат</Button>
                <Button onClick={() => addCircle(color)}>Круг</Button>
                <input ref={inpRef}></input>
                <Button onClick={() => addText(inpRef.current.value)}>Добавить текст</Button>
                <Button onClick={onDelete} danger>Удалить</Button>
                <ColorPicker
                    format={formatHex}
                    value={color}
                    onChange={setColor}
                />
            </div>
        </div>
    );
};
