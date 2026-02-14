(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/DomeGallery.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DomeGallery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$use$2d$gesture$2f$react$2f$dist$2f$use$2d$gesture$2d$react$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@use-gesture/react/dist/use-gesture-react.esm.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
;
;
const DEFAULT_IMAGES = [
    {
        src: "https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Abstract art"
    },
    {
        src: "https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Modern sculpture"
    },
    {
        src: "https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Digital artwork"
    },
    {
        src: "https://images.unsplash.com/photo-1755353985163-c2a0fe5ac3d8?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Contemporary art"
    },
    {
        src: "https://images.unsplash.com/photo-1745965976680-d00be7dc0377?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Geometric pattern"
    },
    {
        src: "https://images.unsplash.com/photo-1752588975228-21f44630bb3c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Textured surface"
    },
    {
        src: "https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large",
        alt: "Social media image"
    }
];
const DEFAULTS = {
    maxVerticalRotationDeg: 5,
    dragSensitivity: 20,
    enlargeTransitionMs: 300,
    segments: 35
};
const clamp = (v, min, max)=>Math.min(Math.max(v, min), max);
const normalizeAngle = (d)=>(d % 360 + 360) % 360;
const wrapAngleSigned = (deg)=>{
    const a = ((deg + 180) % 360 + 360) % 360;
    return a - 180;
};
const getDataNumber = (el, name, fallback)=>{
    const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
    const n = attr == null ? NaN : parseFloat(attr);
    return Number.isFinite(n) ? n : fallback;
};
function buildItems(pool, seg) {
    const xCols = Array.from({
        length: seg
    }, (_, i)=>-37 + i * 2);
    const evenYs = [
        -4,
        -2,
        0,
        2,
        4
    ];
    const oddYs = [
        -3,
        -1,
        1,
        3,
        5
    ];
    const coords = xCols.flatMap((x, c)=>{
        const ys = c % 2 === 0 ? evenYs : oddYs;
        return ys.map((y)=>({
                x,
                y,
                sizeX: 2,
                sizeY: 2
            }));
    });
    const totalSlots = coords.length;
    if (pool.length === 0) {
        return coords.map((c)=>({
                ...c,
                src: "",
                alt: ""
            }));
    }
    if (pool.length > totalSlots) {
        console.warn(`[DomeGallery] Provided image count (${pool.length}) exceeds available tiles (${totalSlots}). Some images will not be shown.`);
    }
    const normalizedImages = pool.map((image)=>{
        if (typeof image === "string") {
            return {
                src: image,
                alt: ""
            };
        }
        return {
            src: image.src || "",
            alt: image.alt || ""
        };
    });
    const usedImages = Array.from({
        length: totalSlots
    }, (_, i)=>normalizedImages[i % normalizedImages.length]);
    for(let i = 1; i < usedImages.length; i++){
        if (usedImages[i].src === usedImages[i - 1].src) {
            for(let j = i + 1; j < usedImages.length; j++){
                if (usedImages[j].src !== usedImages[i].src) {
                    const tmp = usedImages[i];
                    usedImages[i] = usedImages[j];
                    usedImages[j] = tmp;
                    break;
                }
            }
        }
    }
    return coords.map((c, i)=>({
            ...c,
            src: usedImages[i].src,
            alt: usedImages[i].alt
        }));
}
function computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments) {
    const unit = 360 / segments / 2;
    const rotateY = unit * (offsetX + (sizeX - 1) / 2);
    const rotateX = unit * (offsetY - (sizeY - 1) / 2);
    return {
        rotateX,
        rotateY
    };
}
function DomeGallery({ images = DEFAULT_IMAGES, fit = 0.5, fitBasis = "auto", minRadius = 600, maxRadius = Infinity, padFactor = 0.25, overlayBlurColor = "#060010", maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg, dragSensitivity = DEFAULTS.dragSensitivity, enlargeTransitionMs = DEFAULTS.enlargeTransitionMs, segments = DEFAULTS.segments, dragDampening = 2, openedImageWidth = "400px", openedImageHeight = "400px", imageBorderRadius = "30px", openedImageBorderRadius = "30px", grayscale = true, autoRotationSpeed = 0.1 }) {
    _s();
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mainRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sphereRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const frameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const viewerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scrimRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const focusedElRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const originalTilePositionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rotationRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const startRotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const startPosRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const draggingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const cancelTapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const movedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const inertiaRAF = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pointerTypeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])("mouse");
    const tapTargetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const openingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const openStartedAtRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const lastDragEndAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const scrollLockedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lockScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DomeGallery.useCallback[lockScroll]": ()=>{
            if (scrollLockedRef.current) return;
            scrollLockedRef.current = true;
            document.body.classList.add("dg-scroll-lock");
        }
    }["DomeGallery.useCallback[lockScroll]"], []);
    const unlockScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DomeGallery.useCallback[unlockScroll]": ()=>{
            if (!scrollLockedRef.current) return;
            if (rootRef.current?.getAttribute("data-enlarging") === "true") return;
            scrollLockedRef.current = false;
            document.body.classList.remove("dg-scroll-lock");
        }
    }["DomeGallery.useCallback[unlockScroll]"], []);
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DomeGallery.useMemo[items]": ()=>buildItems(images, segments)
    }["DomeGallery.useMemo[items]"], [
        images,
        segments
    ]);
    const applyTransform = (xDeg, yDeg)=>{
        const el = sphereRef.current;
        if (el) {
            el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
        }
    };
    const lockedRadiusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DomeGallery.useEffect": ()=>{
            const root = rootRef.current;
            if (!root) return;
            const ro = new ResizeObserver({
                "DomeGallery.useEffect": (entries)=>{
                    const cr = entries[0].contentRect;
                    const w = Math.max(1, cr.width), h = Math.max(1, cr.height);
                    const minDim = Math.min(w, h), maxDim = Math.max(w, h), aspect = w / h;
                    let basis;
                    switch(fitBasis){
                        case "min":
                            basis = minDim;
                            break;
                        case "max":
                            basis = maxDim;
                            break;
                        case "width":
                            basis = w;
                            break;
                        case "height":
                            basis = h;
                            break;
                        default:
                            basis = aspect >= 1.3 ? w : minDim;
                    }
                    let radius = basis * fit;
                    const heightGuard = h * 1.35;
                    radius = Math.min(radius, heightGuard);
                    radius = clamp(radius, minRadius, maxRadius);
                    lockedRadiusRef.current = Math.round(radius);
                    const viewerPad = Math.max(8, Math.round(minDim * padFactor));
                    root.style.setProperty("--radius", `${lockedRadiusRef.current}px`);
                    root.style.setProperty("--viewer-pad", `${viewerPad}px`);
                    root.style.setProperty("--overlay-blur-color", overlayBlurColor);
                    root.style.setProperty("--tile-radius", imageBorderRadius);
                    root.style.setProperty("--enlarge-radius", openedImageBorderRadius);
                    root.style.setProperty("--image-filter", grayscale ? "grayscale(1)" : "none");
                    applyTransform(rotationRef.current.x, rotationRef.current.y);
                    const enlargedOverlay = viewerRef.current?.querySelector(".enlarge");
                    if (enlargedOverlay && frameRef.current && mainRef.current) {
                        const frameR = frameRef.current.getBoundingClientRect();
                        const mainR = mainRef.current.getBoundingClientRect();
                        const hasCustomSize = openedImageWidth && openedImageHeight;
                        if (hasCustomSize) {
                            const tempDiv = document.createElement("div");
                            tempDiv.style.cssText = `position: absolute; width: ${openedImageWidth}; height: ${openedImageHeight}; visibility: hidden;`;
                            document.body.appendChild(tempDiv);
                            const tempRect = tempDiv.getBoundingClientRect();
                            document.body.removeChild(tempDiv);
                            const centeredLeft = frameR.left - mainR.left + (frameR.width - tempRect.width) / 2;
                            const centeredTop = frameR.top - mainR.top + (frameR.height - tempRect.height) / 2;
                            enlargedOverlay.style.left = `${centeredLeft}px`;
                            enlargedOverlay.style.top = `${centeredTop}px`;
                        } else {
                            enlargedOverlay.style.left = `${frameR.left - mainR.left}px`;
                            enlargedOverlay.style.top = `${frameR.top - mainR.top}px`;
                            enlargedOverlay.style.width = `${frameR.width}px`;
                            enlargedOverlay.style.height = `${frameR.height}px`;
                        }
                    }
                }
            }["DomeGallery.useEffect"]);
            ro.observe(root);
            return ({
                "DomeGallery.useEffect": ()=>ro.disconnect()
            })["DomeGallery.useEffect"];
        }
    }["DomeGallery.useEffect"], [
        fit,
        fitBasis,
        minRadius,
        maxRadius,
        padFactor,
        overlayBlurColor,
        grayscale,
        imageBorderRadius,
        openedImageBorderRadius,
        openedImageWidth,
        openedImageHeight
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DomeGallery.useEffect": ()=>{
            applyTransform(rotationRef.current.x, rotationRef.current.y);
        }
    }["DomeGallery.useEffect"], [
        applyTransform
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DomeGallery.useEffect": ()=>{
            if (autoRotationSpeed === 0) return;
            let rafId;
            const rotate = {
                "DomeGallery.useEffect.rotate": ()=>{
                    // Don't rotate if dragging or if an image is opened
                    if (!draggingRef.current && !focusedElRef.current && !openingRef.current) {
                        rotationRef.current.y = wrapAngleSigned(rotationRef.current.y + autoRotationSpeed);
                        applyTransform(rotationRef.current.x, rotationRef.current.y);
                    }
                    rafId = requestAnimationFrame(rotate);
                }
            }["DomeGallery.useEffect.rotate"];
            rafId = requestAnimationFrame(rotate);
            return ({
                "DomeGallery.useEffect": ()=>cancelAnimationFrame(rafId)
            })["DomeGallery.useEffect"];
        }
    }["DomeGallery.useEffect"], [
        autoRotationSpeed,
        applyTransform
    ]);
    const stopInertia = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DomeGallery.useCallback[stopInertia]": ()=>{
            if (inertiaRAF.current) {
                cancelAnimationFrame(inertiaRAF.current);
                inertiaRAF.current = null;
            }
        }
    }["DomeGallery.useCallback[stopInertia]"], []);
    const startInertia = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DomeGallery.useCallback[startInertia]": (vx, vy)=>{
            const MAX_V = 1.4;
            let vX = clamp(vx, -MAX_V, MAX_V) * 80;
            let vY = clamp(vy, -MAX_V, MAX_V) * 80;
            let frames = 0;
            const d = clamp(dragDampening ?? 0.6, 0, 1);
            const frictionMul = 0.94 + 0.055 * d;
            const stopThreshold = 0.015 - 0.01 * d;
            const maxFrames = Math.round(90 + 270 * d);
            const step = {
                "DomeGallery.useCallback[startInertia].step": ()=>{
                    vX *= frictionMul;
                    vY *= frictionMul;
                    if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
                        inertiaRAF.current = null;
                        return;
                    }
                    if (++frames > maxFrames) {
                        inertiaRAF.current = null;
                        return;
                    }
                    const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
                    const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
                    rotationRef.current = {
                        x: nextX,
                        y: nextY
                    };
                    applyTransform(nextX, nextY);
                    inertiaRAF.current = requestAnimationFrame(step);
                }
            }["DomeGallery.useCallback[startInertia].step"];
            stopInertia();
            inertiaRAF.current = requestAnimationFrame(step);
        }
    }["DomeGallery.useCallback[startInertia]"], [
        dragDampening,
        maxVerticalRotationDeg,
        stopInertia
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$use$2d$gesture$2f$react$2f$dist$2f$use$2d$gesture$2d$react$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useGesture"])({
        onDragStart: {
            "DomeGallery.useGesture": ({ event })=>{
                if (focusedElRef.current) return;
                stopInertia();
                const evt = event;
                pointerTypeRef.current = evt.pointerType || "mouse";
                if (pointerTypeRef.current === "touch") evt.preventDefault();
                if (pointerTypeRef.current === "touch") lockScroll();
                draggingRef.current = true;
                cancelTapRef.current = false;
                movedRef.current = false;
                startRotRef.current = {
                    ...rotationRef.current
                };
                startPosRef.current = {
                    x: evt.clientX,
                    y: evt.clientY
                };
                const potential = evt.target.closest?.(".item__image");
                tapTargetRef.current = potential || null;
            }
        }["DomeGallery.useGesture"],
        onDrag: {
            "DomeGallery.useGesture": ({ event: event_0, last, velocity: velArr = [
                0,
                0
            ], direction: dirArr = [
                0,
                0
            ], movement })=>{
                if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;
                const evt_0 = event_0;
                if (pointerTypeRef.current === "touch") evt_0.preventDefault();
                const dxTotal = evt_0.clientX - startPosRef.current.x;
                const dyTotal = evt_0.clientY - startPosRef.current.y;
                if (!movedRef.current) {
                    const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
                    if (dist2 > 16) movedRef.current = true;
                }
                const nextX_0 = clamp(startRotRef.current.x - dyTotal / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg);
                const nextY_0 = startRotRef.current.y + dxTotal / dragSensitivity;
                const cur = rotationRef.current;
                if (cur.x !== nextX_0 || cur.y !== nextY_0) {
                    rotationRef.current = {
                        x: nextX_0,
                        y: nextY_0
                    };
                    applyTransform(nextX_0, nextY_0);
                }
                if (last) {
                    draggingRef.current = false;
                    let isTap = false;
                    if (startPosRef.current) {
                        const dx = evt_0.clientX - startPosRef.current.x;
                        const dy = evt_0.clientY - startPosRef.current.y;
                        const dist2_0 = dx * dx + dy * dy;
                        const TAP_THRESH_PX = pointerTypeRef.current === "touch" ? 10 : 6;
                        if (dist2_0 <= TAP_THRESH_PX * TAP_THRESH_PX) {
                            isTap = true;
                        }
                    }
                    let [vMagX, vMagY] = velArr;
                    const [dirX, dirY] = dirArr;
                    let vx_0 = vMagX * dirX;
                    let vy_0 = vMagY * dirY;
                    if (!isTap && Math.abs(vx_0) < 0.001 && Math.abs(vy_0) < 0.001 && Array.isArray(movement)) {
                        const [mx, my] = movement;
                        vx_0 = mx / dragSensitivity * 0.02;
                        vy_0 = my / dragSensitivity * 0.02;
                    }
                    if (!isTap && (Math.abs(vx_0) > 0.005 || Math.abs(vy_0) > 0.005)) {
                        startInertia(vx_0, vy_0);
                    }
                    startPosRef.current = null;
                    cancelTapRef.current = !isTap;
                    if (isTap && tapTargetRef.current && !focusedElRef.current) {
                        openItemFromElement(tapTargetRef.current);
                    }
                    tapTargetRef.current = null;
                    if (cancelTapRef.current) setTimeout({
                        "DomeGallery.useGesture": ()=>cancelTapRef.current = false
                    }["DomeGallery.useGesture"], 120);
                    if (pointerTypeRef.current === "touch") unlockScroll();
                    if (movedRef.current) lastDragEndAt.current = performance.now();
                    movedRef.current = false;
                }
            }
        }["DomeGallery.useGesture"]
    }, {
        target: mainRef,
        eventOptions: {
            passive: false
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DomeGallery.useEffect": ()=>{
            const scrim = scrimRef.current;
            if (!scrim) return;
            const close = {
                "DomeGallery.useEffect.close": ()=>{
                    if (performance.now() - openStartedAtRef.current < 250) return;
                    const el_0 = focusedElRef.current;
                    if (!el_0) return;
                    const parent = el_0.parentElement;
                    const overlay = viewerRef.current?.querySelector(".enlarge");
                    if (!overlay) return;
                    const refDiv = parent.querySelector(".item__image--reference");
                    const originalPos = originalTilePositionRef.current;
                    if (!originalPos) {
                        overlay.remove();
                        if (refDiv) refDiv.remove();
                        parent.style.setProperty("--rot-y-delta", `0deg`);
                        parent.style.setProperty("--rot-x-delta", `0deg`);
                        el_0.style.visibility = "";
                        el_0.style.zIndex = 0;
                        focusedElRef.current = null;
                        rootRef.current?.removeAttribute("data-enlarging");
                        openingRef.current = false;
                        viewerRef.current?.querySelectorAll(".romantic-label").forEach({
                            "DomeGallery.useEffect.close": (el_1)=>el_1.remove()
                        }["DomeGallery.useEffect.close"]);
                        return;
                    }
                    const currentRect = overlay.getBoundingClientRect();
                    const rootRect = rootRef.current.getBoundingClientRect();
                    const originalPosRelativeToRoot = {
                        left: originalPos.left - rootRect.left,
                        top: originalPos.top - rootRect.top,
                        width: originalPos.width,
                        height: originalPos.height
                    };
                    const overlayRelativeToRoot = {
                        left: currentRect.left - rootRect.left,
                        top: currentRect.top - rootRect.top,
                        width: currentRect.width,
                        height: currentRect.height
                    };
                    const animatingOverlay = document.createElement("div");
                    animatingOverlay.className = "enlarge-closing";
                    animatingOverlay.style.cssText = `
        position: absolute;
        left: ${overlayRelativeToRoot.left}px;
        top: ${overlayRelativeToRoot.top}px;
        width: ${overlayRelativeToRoot.width}px;
        height: ${overlayRelativeToRoot.height}px;
        z-index: 9999;
        border-radius: ${openedImageBorderRadius};
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,.35);
        transition: all ${enlargeTransitionMs}ms ease-out;
        pointer-events: none;
        margin: 0;
        transform: none;
        filter: ${grayscale ? "grayscale(1)" : "none"};
      `;
                    const originalImg = overlay.querySelector("img");
                    if (originalImg) {
                        const img = originalImg.cloneNode();
                        img.style.cssText = "width: 100%; height: 100%; object-fit: cover;";
                        animatingOverlay.appendChild(img);
                    }
                    overlay.remove();
                    viewerRef.current?.querySelectorAll(".romantic-label").forEach({
                        "DomeGallery.useEffect.close": (label)=>{
                            label.style.opacity = "0";
                            const isMobile = window.innerWidth <= 768;
                            if (isMobile) {
                                label.style.transform = label.classList.contains("label-left") ? "translateY(-20px)" : "translateY(20px)";
                            } else {
                                label.style.transform = label.classList.contains("label-left") ? "translateX(-20px)" : "translateX(20px)";
                            }
                            setTimeout({
                                "DomeGallery.useEffect.close": ()=>label.remove()
                            }["DomeGallery.useEffect.close"], enlargeTransitionMs);
                        }
                    }["DomeGallery.useEffect.close"]);
                    rootRef.current.appendChild(animatingOverlay);
                    void animatingOverlay.getBoundingClientRect();
                    requestAnimationFrame({
                        "DomeGallery.useEffect.close": ()=>{
                            animatingOverlay.style.left = originalPosRelativeToRoot.left + "px";
                            animatingOverlay.style.top = originalPosRelativeToRoot.top + "px";
                            animatingOverlay.style.width = originalPosRelativeToRoot.width + "px";
                            animatingOverlay.style.height = originalPosRelativeToRoot.height + "px";
                            animatingOverlay.style.opacity = "0";
                        }
                    }["DomeGallery.useEffect.close"]);
                    const cleanup = {
                        "DomeGallery.useEffect.close.cleanup": ()=>{
                            animatingOverlay.remove();
                            originalTilePositionRef.current = null;
                            if (refDiv) refDiv.remove();
                            parent.style.transition = "none";
                            el_0.style.transition = "none";
                            parent.style.setProperty("--rot-y-delta", `0deg`);
                            parent.style.setProperty("--rot-x-delta", `0deg`);
                            requestAnimationFrame({
                                "DomeGallery.useEffect.close.cleanup": ()=>{
                                    el_0.style.visibility = "";
                                    el_0.style.opacity = "0";
                                    el_0.style.zIndex = 0;
                                    focusedElRef.current = null;
                                    rootRef.current?.removeAttribute("data-enlarging");
                                    requestAnimationFrame({
                                        "DomeGallery.useEffect.close.cleanup": ()=>{
                                            parent.style.transition = "";
                                            el_0.style.transition = "opacity 300ms ease-out";
                                            requestAnimationFrame({
                                                "DomeGallery.useEffect.close.cleanup": ()=>{
                                                    el_0.style.opacity = "1";
                                                    setTimeout({
                                                        "DomeGallery.useEffect.close.cleanup": ()=>{
                                                            el_0.style.transition = "";
                                                            el_0.style.opacity = "";
                                                            openingRef.current = false;
                                                            if (!draggingRef.current && rootRef.current?.getAttribute("data-enlarging") !== "true") {
                                                                document.body.classList.remove("dg-scroll-lock");
                                                            }
                                                        }
                                                    }["DomeGallery.useEffect.close.cleanup"], 300);
                                                }
                                            }["DomeGallery.useEffect.close.cleanup"]);
                                        }
                                    }["DomeGallery.useEffect.close.cleanup"]);
                                }
                            }["DomeGallery.useEffect.close.cleanup"]);
                        }
                    }["DomeGallery.useEffect.close.cleanup"];
                    animatingOverlay.addEventListener("transitionend", cleanup, {
                        once: true
                    });
                }
            }["DomeGallery.useEffect.close"];
            scrim.addEventListener("click", close);
            const onKey = {
                "DomeGallery.useEffect.onKey": (e)=>{
                    if (e.key === "Escape") close();
                }
            }["DomeGallery.useEffect.onKey"];
            window.addEventListener("keydown", onKey);
            return ({
                "DomeGallery.useEffect": ()=>{
                    scrim.removeEventListener("click", close);
                    window.removeEventListener("keydown", onKey);
                }
            })["DomeGallery.useEffect"];
        }
    }["DomeGallery.useEffect"], [
        enlargeTransitionMs,
        openedImageBorderRadius,
        grayscale
    ]);
    const openItemFromElement = (el_2)=>{
        if (openingRef.current) return;
        openingRef.current = true;
        openStartedAtRef.current = performance.now();
        lockScroll();
        const parent_0 = el_2.parentElement;
        focusedElRef.current = el_2;
        el_2.setAttribute("data-focused", "true");
        const offsetX = getDataNumber(parent_0, "offsetX", 0);
        const offsetY = getDataNumber(parent_0, "offsetY", 0);
        const sizeX = getDataNumber(parent_0, "sizeX", 2);
        const sizeY = getDataNumber(parent_0, "sizeY", 2);
        const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments);
        const parentY = normalizeAngle(parentRot.rotateY);
        const globalY = normalizeAngle(rotationRef.current.y);
        let rotY = -(parentY + globalY) % 360;
        if (rotY < -180) rotY += 360;
        const rotX = -parentRot.rotateX - rotationRef.current.x;
        parent_0.style.setProperty("--rot-y-delta", `${rotY}deg`);
        parent_0.style.setProperty("--rot-x-delta", `${rotX}deg`);
        const refDiv_0 = document.createElement("div");
        refDiv_0.className = "item__image item__image--reference opacity-0";
        refDiv_0.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
        parent_0.appendChild(refDiv_0);
        void refDiv_0.offsetHeight;
        const tileR = refDiv_0.getBoundingClientRect();
        const mainR_0 = mainRef.current?.getBoundingClientRect();
        const frameR_0 = frameRef.current?.getBoundingClientRect();
        if (!mainR_0 || !frameR_0 || tileR.width <= 0 || tileR.height <= 0) {
            openingRef.current = false;
            focusedElRef.current = null;
            parent_0.removeChild(refDiv_0);
            unlockScroll();
            return;
        }
        originalTilePositionRef.current = {
            left: tileR.left,
            top: tileR.top,
            width: tileR.width,
            height: tileR.height
        };
        el_2.style.visibility = "hidden";
        el_2.style.zIndex = 0;
        const overlay_0 = document.createElement("div");
        overlay_0.className = "enlarge";
        overlay_0.style.cssText = `position:absolute; left:${frameR_0.left - mainR_0.left}px; top:${frameR_0.top - mainR_0.top}px; width:${frameR_0.width}px; height:${frameR_0.height}px; opacity:0; z-index:30; will-change:transform,opacity; transform-origin:top left; transition:transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease; border-radius:${openedImageBorderRadius}; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.35);`;
        const rawSrc = parent_0.dataset.src || el_2.querySelector("img")?.src || "";
        const rawAlt = parent_0.dataset.alt || el_2.querySelector("img")?.alt || "";
        const img_0 = document.createElement("img");
        img_0.src = rawSrc;
        img_0.alt = rawAlt;
        img_0.style.cssText = `width:100%; height:100%; object-fit:cover; filter:${grayscale ? "grayscale(1)" : "none"};`;
        overlay_0.appendChild(img_0);
        viewerRef.current.appendChild(overlay_0);
        const tx0 = tileR.left - frameR_0.left;
        const ty0 = tileR.top - frameR_0.top;
        const sx0 = tileR.width / frameR_0.width;
        const sy0 = tileR.height / frameR_0.height;
        const validSx0 = isFinite(sx0) && sx0 > 0 ? sx0 : 1;
        const validSy0 = isFinite(sy0) && sy0 > 0 ? sy0 : 1;
        overlay_0.style.transform = `translate(${tx0}px, ${ty0}px) scale(${validSx0}, ${validSy0})`;
        setTimeout(()=>{
            if (!overlay_0.parentElement) return;
            overlay_0.style.opacity = "1";
            overlay_0.style.transform = "translate(0px, 0px) scale(1, 1)";
            rootRef.current?.setAttribute("data-enlarging", "true");
        }, 16);
        const wantsResize = openedImageWidth || openedImageHeight;
        if (wantsResize) {
            const onFirstEnd = (ev)=>{
                if (ev.propertyName !== "transform") return;
                overlay_0.removeEventListener("transitionend", onFirstEnd);
                const prevTransition = overlay_0.style.transition;
                overlay_0.style.transition = "none";
                const tempWidth = openedImageWidth || `${frameR_0.width}px`;
                const tempHeight = openedImageHeight || `${frameR_0.height}px`;
                overlay_0.style.width = tempWidth;
                overlay_0.style.height = tempHeight;
                const newRect = overlay_0.getBoundingClientRect();
                overlay_0.style.width = frameR_0.width + "px";
                overlay_0.style.height = frameR_0.height + "px";
                void overlay_0.offsetWidth;
                overlay_0.style.transition = `left ${enlargeTransitionMs}ms ease, top ${enlargeTransitionMs}ms ease, width ${enlargeTransitionMs}ms ease, height ${enlargeTransitionMs}ms ease`;
                const centeredLeft_0 = frameR_0.left - mainR_0.left + (frameR_0.width - newRect.width) / 2;
                const centeredTop_0 = frameR_0.top - mainR_0.top + (frameR_0.height - newRect.height) / 2;
                requestAnimationFrame(()=>{
                    overlay_0.style.left = `${centeredLeft_0}px`;
                    overlay_0.style.top = `${centeredTop_0}px`;
                    overlay_0.style.width = tempWidth;
                    overlay_0.style.height = tempHeight;
                });
                const cleanupSecond = ()=>{
                    overlay_0.removeEventListener("transitionend", cleanupSecond);
                    overlay_0.style.transition = prevTransition;
                };
                overlay_0.addEventListener("transitionend", cleanupSecond, {
                    once: true
                });
            };
            overlay_0.addEventListener("transitionend", onFirstEnd);
        }
        // Add romantic labels
        const labelLeft = document.createElement("div");
        labelLeft.className = "romantic-label label-left font-playfair";
        labelLeft.innerText = "My";
        const labelRight = document.createElement("div");
        labelRight.className = "romantic-label label-right font-playfair";
        labelRight.innerText = "Everything";
        viewerRef.current?.appendChild(labelLeft);
        viewerRef.current?.appendChild(labelRight);
        const checkAndShowLabels = ()=>{
            if (rootRef.current?.getAttribute("data-enlarging") === "true") {
                labelLeft.style.opacity = "1";
                labelLeft.style.transform = "translate(0, 0)";
                labelRight.style.opacity = "1";
                labelRight.style.transform = "translate(0, 0)";
            } else {
                labelLeft.remove();
                labelRight.remove();
            }
        };
        setTimeout(checkAndShowLabels, enlargeTransitionMs);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DomeGallery.useEffect": ()=>{
            return ({
                "DomeGallery.useEffect": ()=>{
                    document.body.classList.remove("dg-scroll-lock");
                }
            })["DomeGallery.useEffect"];
        }
    }["DomeGallery.useEffect"], []);
    const cssStyles = `
    .sphere-root {
      --radius: 520px;
      --viewer-pad: 72px;
      --circ: calc(var(--radius) * 3.14);
      --rot-y: calc((360deg / var(--segments-x)) / 2);
      --rot-x: calc((360deg / var(--segments-y)) / 2);
      --item-width: calc(var(--circ) / var(--segments-x));
      --item-height: calc(var(--circ) / var(--segments-y));
    }
    
    .sphere-root * { box-sizing: border-box; }
    .sphere, .sphere-item, .item__image { transform-style: preserve-3d; }
    
    .stage {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      position: absolute;
      inset: 0;
      margin: auto;
      perspective: calc(var(--radius) * 2);
      perspective-origin: 50% 50%;
    }
    
    .sphere {
      transform: translateZ(calc(var(--radius) * -1));
      will-change: transform;
      position: absolute;
    }
    
    .sphere-item {
      width: calc(var(--item-width) * var(--item-size-x));
      height: calc(var(--item-height) * var(--item-size-y));
      position: absolute;
      top: -999px;
      bottom: -999px;
      left: -999px;
      right: -999px;
      margin: auto;
      transform-origin: 50% 50%;
      backface-visibility: hidden;
      transition: transform 300ms;
      transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))) 
                 rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg))) 
                 translateZ(var(--radius));
    }
    
    .sphere-root[data-enlarging="true"] .scrim {
      opacity: 1 !important;
      pointer-events: all !important;
    }
    
    @media (max-aspect-ratio: 1/1) {
      .viewer-frame {
        height: auto !important;
        width: 100% !important;
      }
    }
    
    // body.dg-scroll-lock {
    //   position: fixed !important;
    //   top: 0;
    //   left: 0;
    //   width: 100% !important;
    //   height: 100% !important;
    //   overflow: hidden !important;
    //   touch-action: none !important;
    //   overscroll-behavior: contain !important;
    // }
    .item__image {
      position: absolute;
      inset: 10px;
      border-radius: var(--tile-radius, 12px);
      overflow: hidden;
      cursor: pointer;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transition: transform 300ms;
      pointer-events: auto;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
    .item__image--reference {
      position: absolute;
      inset: 10px;
      pointer-events: none;
    }

    .romantic-label {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: white;
      font-size: 3rem;
      opacity: 0;
      transition: all 500ms ease-out;
      z-index: 40;
      pointer-events: none;
      text-shadow: 0 0 20px rgba(255, 105, 180, 0.5);
    }

    .label-left {
      left: 5%;
      transform: translateY(-50%) translateX(-20px);
    }

    .label-right {
      right: 5%;
      transform: translateY(-50%) translateX(20px);
    }

    @media (max-width: 768px) {
      .romantic-label {
        font-size: 2.2rem;
        left: 0;
        right: 0;
        text-align: center;
        width: 100%;
      }
      .label-left {
        top: 12%;
        transform: translateY(-20px);
      }
      .label-right {
        top: auto;
        bottom: 12%;
        transform: translateY(20px);
      }
    }
  `;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                dangerouslySetInnerHTML: {
                    __html: cssStyles
                }
            }, void 0, false, {
                fileName: "[project]/components/DomeGallery.tsx",
                lineNumber: 818,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: rootRef,
                className: "sphere-root relative w-full h-full",
                style: {
                    ["--segments-x"]: segments,
                    ["--segments-y"]: segments,
                    ["--overlay-blur-color"]: overlayBlurColor,
                    ["--tile-radius"]: imageBorderRadius,
                    ["--enlarge-radius"]: openedImageBorderRadius,
                    ["--image-filter"]: grayscale ? "grayscale(1)" : "none"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    ref: mainRef,
                    className: "absolute inset-0 grid place-items-center overflow-hidden select-none bg-transparent",
                    style: {
                        touchAction: "none",
                        WebkitUserSelect: "none"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "stage",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: sphereRef,
                                className: "sphere",
                                children: items.map((it, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sphere-item absolute m-auto",
                                        "data-src": it.src,
                                        "data-alt": it.alt,
                                        "data-offset-x": it.x,
                                        "data-offset-y": it.y,
                                        "data-size-x": it.sizeX,
                                        "data-size-y": it.sizeY,
                                        style: {
                                            ["--offset-x"]: it.x,
                                            ["--offset-y"]: it.y,
                                            ["--item-size-x"]: it.sizeX,
                                            ["--item-size-y"]: it.sizeY,
                                            top: "-999px",
                                            bottom: "-999px",
                                            left: "-999px",
                                            right: "-999px"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "item__image absolute block overflow-hidden cursor-pointer bg-gray-200 transition-transform duration-300",
                                            role: "button",
                                            tabIndex: 0,
                                            "aria-label": it.alt || "Open image",
                                            onClick: (e_0)=>{
                                                if (draggingRef.current) return;
                                                if (movedRef.current) return;
                                                if (performance.now() - lastDragEndAt.current < 80) return;
                                                if (openingRef.current) return;
                                                openItemFromElement(e_0.currentTarget);
                                            },
                                            onPointerUp: (e_1)=>{
                                                if (e_1.nativeEvent.pointerType !== "touch") return;
                                                if (draggingRef.current) return;
                                                if (movedRef.current) return;
                                                if (performance.now() - lastDragEndAt.current < 80) return;
                                                if (openingRef.current) return;
                                                openItemFromElement(e_1.currentTarget);
                                            },
                                            style: {
                                                inset: "10px",
                                                borderRadius: `var(--tile-radius, ${imageBorderRadius})`,
                                                backfaceVisibility: "hidden"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: it.src,
                                                draggable: false,
                                                alt: it.alt,
                                                className: "w-full h-full object-cover pointer-events-none",
                                                style: {
                                                    backfaceVisibility: "hidden",
                                                    filter: `var(--image-filter, ${grayscale ? "grayscale(1)" : "none"})`
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/DomeGallery.tsx",
                                                lineNumber: 863,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/DomeGallery.tsx",
                                            lineNumber: 845,
                                            columnNumber: 19
                                        }, this)
                                    }, `${it.x},${it.y},${i}`, false, {
                                        fileName: "[project]/components/DomeGallery.tsx",
                                        lineNumber: 835,
                                        columnNumber: 37
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/DomeGallery.tsx",
                                lineNumber: 834,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/DomeGallery.tsx",
                            lineNumber: 833,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 m-auto z-[3] pointer-events-none",
                            style: {
                                backgroundImage: `radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color, ${overlayBlurColor}) 100%)`
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/DomeGallery.tsx",
                            lineNumber: 872,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 m-auto z-[3] pointer-events-none",
                            style: {
                                WebkitMaskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${overlayBlurColor}) 90%)`,
                                maskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${overlayBlurColor}) 90%)`,
                                backdropFilter: "blur(3px)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/DomeGallery.tsx",
                            lineNumber: 876,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-0 right-0 top-0 h-[120px] z-[5] pointer-events-none rotate-180",
                            style: {
                                background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))`
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/DomeGallery.tsx",
                            lineNumber: 882,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-0 right-0 bottom-0 h-[120px] z-[5] pointer-events-none",
                            style: {
                                background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))`
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/DomeGallery.tsx",
                            lineNumber: 885,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: viewerRef,
                            className: "absolute inset-0 z-20 pointer-events-none flex items-center justify-center",
                            style: {
                                padding: "var(--viewer-pad)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ref: scrimRef,
                                    className: "scrim absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-500",
                                    style: {
                                        background: "rgba(0, 0, 0, 0.4)",
                                        backdropFilter: "blur(3px)"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/DomeGallery.tsx",
                                    lineNumber: 892,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ref: frameRef,
                                    className: "viewer-frame h-full aspect-square flex",
                                    style: {
                                        borderRadius: `var(--enlarge-radius, ${openedImageBorderRadius})`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/DomeGallery.tsx",
                                    lineNumber: 896,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/DomeGallery.tsx",
                            lineNumber: 889,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/DomeGallery.tsx",
                    lineNumber: 829,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/DomeGallery.tsx",
                lineNumber: 821,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(DomeGallery, "EuPNr/mlTYlRDHteO9Sj5s4LNeY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$use$2d$gesture$2f$react$2f$dist$2f$use$2d$gesture$2d$react$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useGesture"]
    ];
});
_c = DomeGallery;
var _c;
__turbopack_context__.k.register(_c, "DomeGallery");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/InteractionFlow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InteractionFlow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// --- Background Particles ---
const BackgroundHearts = ()=>{
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "0f51edf6d2fc42389011f13b2fac64aaaafb35cc015d98343a7393ac1fb76578") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0f51edf6d2fc42389011f13b2fac64aaaafb35cc015d98343a7393ac1fb76578";
    }
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ()=>setMounted(true);
        t1 = [];
        $[1] = t0;
        $[2] = t1;
    } else {
        t0 = $[1];
        t1 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    if (!mounted) {
        return null;
    }
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 overflow-hidden pointer-events-none",
            children: [
                ...Array(10)
            ].map(_temp)
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 35,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    return t2;
};
_s(BackgroundHearts, "LrrVfNW3d1raFE0BNzCTILYmIfo=");
_c = BackgroundHearts;
// --- Step 1: Love Mode ---
const LoveModeStep = (t0)=>{
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(47);
    if ($[0] !== "0f51edf6d2fc42389011f13b2fac64aaaafb35cc015d98343a7393ac1fb76578") {
        for(let $i = 0; $i < 47; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0f51edf6d2fc42389011f13b2fac64aaaafb35cc015d98343a7393ac1fb76578";
    }
    const { onComplete } = t0;
    const [isOn, setIsOn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t1;
    let t2;
    if ($[1] !== isOn || $[2] !== onComplete) {
        t1 = ()=>{
            if (isOn) {
                const timer = setTimeout(()=>onComplete(), 3000);
                return ()=>clearTimeout(timer);
            }
        };
        t2 = [
            isOn,
            onComplete
        ];
        $[1] = isOn;
        $[2] = onComplete;
        $[3] = t1;
        $[4] = t2;
    } else {
        t1 = $[3];
        t2 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    let t3;
    let t4;
    let t5;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            opacity: 0,
            scale: 0.95
        };
        t4 = {
            opacity: 1,
            scale: 1
        };
        t5 = {
            opacity: 0,
            scale: 1.05,
            filter: "blur(10px)"
        };
        $[5] = t3;
        $[6] = t4;
        $[7] = t5;
    } else {
        t3 = $[5];
        t4 = $[6];
        t5 = $[7];
    }
    const t6 = `backdrop-blur-2xl p-12 rounded-[3rem] transition-all duration-1000 ease-in-out flex flex-col items-center space-y-10 border border-white/10 ${isOn ? "bg-red-500/10 shadow-[0_0_80px_rgba(239,68,68,0.2)] border-red-500/20" : "bg-white/5 shadow-2xl"}`;
    let t7;
    if ($[8] !== isOn) {
        t7 = isOn ? {
            scale: [
                1,
                1.15,
                1
            ],
            filter: [
                "drop-shadow(0 0 0px rgba(239,68,68,0))",
                "drop-shadow(0 0 20px rgba(239,68,68,0.6))",
                "drop-shadow(0 0 0px rgba(239,68,68,0))"
            ]
        } : {};
        $[8] = isOn;
        $[9] = t7;
    } else {
        t7 = $[9];
    }
    let t8;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = {
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
        };
        $[10] = t8;
    } else {
        t8 = $[10];
    }
    const t9 = `w-24 h-24 transition-all duration-1000 ${isOn ? "text-red-500 fill-red-500" : "text-white/10"}`;
    let t10;
    if ($[11] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
            className: t9
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 126,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[11] = t9;
        $[12] = t10;
    } else {
        t10 = $[12];
    }
    let t11;
    if ($[13] !== t10 || $[14] !== t7) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                animate: t7,
                transition: t8,
                children: t10
            }, void 0, false, {
                fileName: "[project]/components/InteractionFlow.tsx",
                lineNumber: 134,
                columnNumber: 37
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 134,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[13] = t10;
        $[14] = t7;
        $[15] = t11;
    } else {
        t11 = $[15];
    }
    const t12 = `text-5xl font-playfair transition-colors duration-1000 ${isOn ? "text-white" : "text-white/40"}`;
    let t13;
    if ($[16] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t12,
            children: "Love mode"
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 144,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[16] = t12;
        $[17] = t13;
    } else {
        t13 = $[17];
    }
    let t14;
    if ($[18] !== isOn) {
        t14 = ()=>setIsOn(!isOn);
        $[18] = isOn;
        $[19] = t14;
    } else {
        t14 = $[19];
    }
    const t15 = `group relative w-32 h-16 rounded-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] p-1.5 focus:outline-none ${isOn ? "bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]" : "bg-white/10"}`;
    const t16 = isOn ? 64 : 0;
    let t17;
    if ($[20] !== t16) {
        t17 = {
            x: t16
        };
        $[20] = t16;
        $[21] = t17;
    } else {
        t17 = $[21];
    }
    let t18;
    if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = {
            type: "spring",
            stiffness: 400,
            damping: 30
        };
        $[22] = t18;
    } else {
        t18 = $[22];
    }
    const t19 = `transition-colors duration-500 ${isOn ? "text-red-500 fill-red-500" : "text-gray-300"}`;
    let t20;
    if ($[23] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
            size: 24,
            className: t19
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 184,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[23] = t19;
        $[24] = t20;
    } else {
        t20 = $[24];
    }
    let t21;
    if ($[25] !== t17 || $[26] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            animate: t17,
            transition: t18,
            className: "w-13 h-13 bg-white rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.2)] flex items-center justify-center pointer-events-none",
            children: t20
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 192,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[25] = t17;
        $[26] = t20;
        $[27] = t21;
    } else {
        t21 = $[27];
    }
    let t22;
    if ($[28] !== isOn) {
        t22 = !isOn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            className: "absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30",
            children: "off"
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 201,
            columnNumber: 20
        }, ("TURBOPACK compile-time value", void 0));
        $[28] = isOn;
        $[29] = t22;
    } else {
        t22 = $[29];
    }
    let t23;
    if ($[30] !== isOn) {
        t23 = isOn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            className: "absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80",
            children: "on"
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 215,
            columnNumber: 19
        }, ("TURBOPACK compile-time value", void 0));
        $[30] = isOn;
        $[31] = t23;
    } else {
        t23 = $[31];
    }
    let t24;
    if ($[32] !== t22 || $[33] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            children: [
                t22,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 229,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[32] = t22;
        $[33] = t23;
        $[34] = t24;
    } else {
        t24 = $[34];
    }
    let t25;
    if ($[35] !== t14 || $[36] !== t15 || $[37] !== t21 || $[38] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t14,
            className: t15,
            children: [
                t21,
                t24
            ]
        }, void 0, true, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 238,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[35] = t14;
        $[36] = t15;
        $[37] = t21;
        $[38] = t24;
        $[39] = t25;
    } else {
        t25 = $[39];
    }
    let t26;
    if ($[40] !== t13 || $[41] !== t25) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center space-y-6",
            children: [
                t13,
                t25
            ]
        }, void 0, true, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 249,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[40] = t13;
        $[41] = t25;
        $[42] = t26;
    } else {
        t26 = $[42];
    }
    let t27;
    if ($[43] !== t11 || $[44] !== t26 || $[45] !== t6) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t3,
            animate: t4,
            exit: t5,
            className: "flex flex-col items-center justify-center relative z-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: t6,
                children: [
                    t11,
                    t26
                ]
            }, void 0, true, {
                fileName: "[project]/components/InteractionFlow.tsx",
                lineNumber: 258,
                columnNumber: 127
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 258,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[43] = t11;
        $[44] = t26;
        $[45] = t6;
        $[46] = t27;
    } else {
        t27 = $[46];
    }
    return t27;
};
_s1(LoveModeStep, "8lOBNNx9kKBYVIm9aq2L1dPZgaw=");
_c1 = LoveModeStep;
// --- Step 2: Tic-Tac-Toe ---
const TicTacToeStep = (t0)=>{
    _s2();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(33);
    if ($[0] !== "0f51edf6d2fc42389011f13b2fac64aaaafb35cc015d98343a7393ac1fb76578") {
        for(let $i = 0; $i < 33; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0f51edf6d2fc42389011f13b2fac64aaaafb35cc015d98343a7393ac1fb76578";
    }
    const { onComplete } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = Array(9).fill(null);
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const [board, setBoard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    const [isUserTurn, setIsUserTurn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [winner, setWinner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Let's play a little game...");
    const checkWinner = _temp2;
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = (currentBoard)=>{
            const emptyIndices = currentBoard.map(_temp3).filter(_temp4);
            if (emptyIndices.length === 0) {
                return;
            }
            const nonCenterIndices = emptyIndices.filter(_temp5);
            const targetIndex = nonCenterIndices.length > 0 ? nonCenterIndices[Math.floor(Math.random() * nonCenterIndices.length)] : 4;
            const newBoard = [
                ...currentBoard
            ];
            newBoard[targetIndex] = "O";
            setBoard(newBoard);
            const result = checkWinner(newBoard);
            if (result) {
                setWinner(result);
            } else {
                setIsUserTurn(true);
            }
        };
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const makeAIMove = t2;
    let t3;
    if ($[3] !== board || $[4] !== isUserTurn || $[5] !== winner) {
        t3 = (index)=>{
            if (board[index] || winner || !isUserTurn) {
                return;
            }
            const newBoard_0 = [
                ...board
            ];
            newBoard_0[index] = "X";
            setBoard(newBoard_0);
            const result_0 = checkWinner(newBoard_0);
            if (result_0) {
                setWinner(result_0);
            } else {
                setIsUserTurn(false);
                setTimeout(()=>makeAIMove(newBoard_0), 600);
            }
        };
        $[3] = board;
        $[4] = isUserTurn;
        $[5] = winner;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    const handleSquareClick = t3;
    let t4;
    let t5;
    if ($[7] !== onComplete || $[8] !== winner) {
        t4 = ()=>{
            if (winner === "X") {
                setMessage("yeayy menang!!!");
                setTimeout(()=>onComplete(), 3500);
            } else {
                if (winner === "O" || winner === "draw") {
                    setMessage(winner === "draw" ? "Seri! Coba lagi yaa \u2764\uFE0F" : "Hampir! Sekali lagi...");
                    setTimeout(()=>{
                        setBoard(Array(9).fill(null));
                        setWinner(null);
                        setIsUserTurn(true);
                    }, 1500);
                }
            }
        };
        t5 = [
            winner,
            onComplete
        ];
        $[7] = onComplete;
        $[8] = winner;
        $[9] = t4;
        $[10] = t5;
    } else {
        t4 = $[9];
        t5 = $[10];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t4, t5);
    let t6;
    let t7;
    let t8;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = {
            opacity: 0,
            y: 30
        };
        t7 = {
            opacity: 1,
            y: 0
        };
        t8 = {
            opacity: 0,
            scale: 0.9
        };
        $[11] = t6;
        $[12] = t7;
        $[13] = t8;
    } else {
        t6 = $[11];
        t7 = $[12];
        t8 = $[13];
    }
    const t9 = winner === "X" ? "yeayy menang!!!" : message;
    let t10;
    if ($[14] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-4xl font-playfair text-white text-center drop-shadow-lg max-w-xs whitespace-pre-line leading-tight",
            children: t9
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 397,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[14] = t9;
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    let t11;
    if ($[16] !== board || $[17] !== handleSquareClick || $[18] !== winner) {
        let t12;
        if ($[20] !== handleSquareClick || $[21] !== winner) {
            t12 = (square, i_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>handleSquareClick(i_1),
                    className: "w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all duration-300 group",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        mode: "wait",
                        children: square === "X" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                scale: 0
                            },
                            animate: {
                                scale: 1
                            },
                            transition: winner === "X" ? {
                                delay: i_1 * 0.15,
                                type: "spring"
                            } : {},
                            children: winner === "X" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                className: "w-12 h-12 text-red-500 fill-red-500 filter drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                            }, void 0, false, {
                                fileName: "[project]/components/InteractionFlow.tsx",
                                lineNumber: 414,
                                columnNumber: 37
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-12 h-12 text-white/80"
                            }, void 0, false, {
                                fileName: "[project]/components/InteractionFlow.tsx",
                                lineNumber: 414,
                                columnNumber: 147
                            }, ("TURBOPACK compile-time value", void 0))
                        }, winner === "X" ? "heart" : "x", false, {
                            fileName: "[project]/components/InteractionFlow.tsx",
                            lineNumber: 407,
                            columnNumber: 304
                        }, ("TURBOPACK compile-time value", void 0)) : square === "O" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                scale: 0
                            },
                            animate: {
                                scale: 1
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                className: "w-12 h-12 text-pink-300 opacity-50"
                            }, void 0, false, {
                                fileName: "[project]/components/InteractionFlow.tsx",
                                lineNumber: 418,
                                columnNumber: 14
                            }, ("TURBOPACK compile-time value", void 0))
                        }, "o", false, {
                            fileName: "[project]/components/InteractionFlow.tsx",
                            lineNumber: 414,
                            columnNumber: 222
                        }, ("TURBOPACK compile-time value", void 0)) : null
                    }, void 0, false, {
                        fileName: "[project]/components/InteractionFlow.tsx",
                        lineNumber: 407,
                        columnNumber: 257
                    }, ("TURBOPACK compile-time value", void 0))
                }, i_1, false, {
                    fileName: "[project]/components/InteractionFlow.tsx",
                    lineNumber: 407,
                    columnNumber: 30
                }, ("TURBOPACK compile-time value", void 0));
            $[20] = handleSquareClick;
            $[21] = winner;
            $[22] = t12;
        } else {
            t12 = $[22];
        }
        t11 = board.map(t12);
        $[16] = board;
        $[17] = handleSquareClick;
        $[18] = winner;
        $[19] = t11;
    } else {
        t11 = $[19];
    }
    let t12;
    if ($[23] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-3 gap-3 p-4 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl",
            children: t11
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 435,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[23] = t11;
        $[24] = t12;
    } else {
        t12 = $[24];
    }
    let t13;
    if ($[25] !== winner) {
        t13 = winner === "X" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h2, {
            initial: {
                opacity: 0,
                y: -10
            },
            animate: {
                opacity: 1,
                y: 0
            },
            className: "text-4xl font-playfair text-white text-center drop-shadow-lg mt-4",
            children: "❤❤❤"
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 443,
            columnNumber: 29
        }, ("TURBOPACK compile-time value", void 0));
        $[25] = winner;
        $[26] = t13;
    } else {
        t13 = $[26];
    }
    let t14;
    if ($[27] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            children: t13
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 457,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[27] = t13;
        $[28] = t14;
    } else {
        t14 = $[28];
    }
    let t15;
    if ($[29] !== t10 || $[30] !== t12 || $[31] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t6,
            animate: t7,
            exit: t8,
            className: "flex flex-col items-center justify-center space-y-10 relative z-10",
            children: [
                t10,
                t12,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 465,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[29] = t10;
        $[30] = t12;
        $[31] = t14;
        $[32] = t15;
    } else {
        t15 = $[32];
    }
    return t15;
};
_s2(TicTacToeStep, "2AUxmHgnpeyTmBeIcy0qkvXXCj0=");
_c2 = TicTacToeStep;
// --- Step 3: Love Meter ---
const LoveMeterStep = (t0)=>{
    _s3();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(32);
    if ($[0] !== "0f51edf6d2fc42389011f13b2fac64aaaafb35cc015d98343a7393ac1fb76578") {
        for(let $i = 0; $i < 32; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0f51edf6d2fc42389011f13b2fac64aaaafb35cc015d98343a7393ac1fb76578";
    }
    const { onComplete } = t0;
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    let t1;
    let t2;
    if ($[1] !== onComplete) {
        t1 = ()=>{
            const interval = setInterval(()=>{
                setProgress((prev)=>{
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(()=>onComplete(), 1500);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 40);
            return ()=>clearInterval(interval);
        };
        t2 = [
            onComplete
        ];
        $[1] = onComplete;
        $[2] = t1;
        $[3] = t2;
    } else {
        t1 = $[2];
        t2 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    const circumference = Math.PI * 90;
    const dashOffset = circumference - progress / 100 * circumference;
    let t3;
    let t4;
    let t5;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            opacity: 0
        };
        t4 = {
            opacity: 1
        };
        t5 = {
            opacity: 0
        };
        $[4] = t3;
        $[5] = t4;
        $[6] = t5;
    } else {
        t3 = $[4];
        t4 = $[5];
        t5 = $[6];
    }
    let t6;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M 10,100 A 90,90 0 0 1 190,100",
            fill: "none",
            stroke: "rgba(255,255,255,0.05)",
            strokeWidth: "12",
            strokeLinecap: "round"
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 539,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    let t7;
    if ($[8] !== dashOffset) {
        t7 = {
            strokeDashoffset: dashOffset
        };
        $[8] = dashOffset;
        $[9] = t7;
    } else {
        t7 = $[9];
    }
    let t8;
    let t9;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = {
            duration: 0.1,
            ease: "linear"
        };
        t9 = {
            filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))"
        };
        $[10] = t8;
        $[11] = t9;
    } else {
        t8 = $[10];
        t9 = $[11];
    }
    let t10;
    if ($[12] !== t7) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
            d: "M 10,100 A 90,90 0 0 1 190,100",
            fill: "none",
            stroke: "url(#loveGradient)",
            strokeWidth: "12",
            strokeLinecap: "round",
            strokeDasharray: circumference,
            animate: t7,
            transition: t8,
            style: t9
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 572,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[12] = t7;
        $[13] = t10;
    } else {
        t10 = $[13];
    }
    let t11;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                id: "loveGradient",
                x1: "0%",
                y1: "0%",
                x2: "100%",
                y2: "0%",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                        offset: "0%",
                        stopColor: "#ef4444"
                    }, void 0, false, {
                        fileName: "[project]/components/InteractionFlow.tsx",
                        lineNumber: 580,
                        columnNumber: 85
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                        offset: "100%",
                        stopColor: "#ec4899"
                    }, void 0, false, {
                        fileName: "[project]/components/InteractionFlow.tsx",
                        lineNumber: 580,
                        columnNumber: 125
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/InteractionFlow.tsx",
                lineNumber: 580,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 580,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[14] = t11;
    } else {
        t11 = $[14];
    }
    let t12;
    if ($[15] !== t10) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 200 100",
            className: "w-full h-full absolute top-0 overflow-visible",
            children: [
                t6,
                t10,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 587,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[15] = t10;
        $[16] = t12;
    } else {
        t12 = $[16];
    }
    let t13;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            animate: {
                scale: [
                    1,
                    1.1,
                    1
                ]
            },
            transition: {
                repeat: Infinity,
                duration: 2
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                className: "w-16 h-16 text-red-500 fill-red-500 mb-2"
            }, void 0, false, {
                fileName: "[project]/components/InteractionFlow.tsx",
                lineNumber: 600,
                columnNumber: 8
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 595,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[17] = t13;
    } else {
        t13 = $[17];
    }
    let t14;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-red-400 text-3xl",
            children: "%"
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 607,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[18] = t14;
    } else {
        t14 = $[18];
    }
    let t15;
    if ($[19] !== progress) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-6xl font-black text-white font-mono tracking-tighter",
            children: [
                progress,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 614,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[19] = progress;
        $[20] = t15;
    } else {
        t15 = $[20];
    }
    let t16;
    if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-2xl text-white/60 font-playfair italic mt-2 tracking-widest",
            children: "Love Intensity"
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 622,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[21] = t16;
    } else {
        t16 = $[21];
    }
    let t17;
    if ($[22] !== t15) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "z-10 flex flex-col items-center pb-4",
            children: [
                t13,
                t15,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 629,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[22] = t15;
        $[23] = t17;
    } else {
        t17 = $[23];
    }
    let t18;
    if ($[24] !== t12 || $[25] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full aspect-[2/1] flex flex-col items-center justify-end overflow-hidden",
            children: [
                t12,
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 637,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[24] = t12;
        $[25] = t17;
        $[26] = t18;
    } else {
        t18 = $[26];
    }
    const t19 = `${progress}%`;
    let t20;
    if ($[27] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "h-full bg-gradient-to-r from-red-500 to-pink-500",
                animate: {
                    width: t19
                }
            }, void 0, false, {
                fileName: "[project]/components/InteractionFlow.tsx",
                lineNumber: 647,
                columnNumber: 102
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 647,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[27] = t19;
        $[28] = t20;
    } else {
        t20 = $[28];
    }
    let t21;
    if ($[29] !== t18 || $[30] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t3,
            animate: t4,
            exit: t5,
            className: "flex flex-col items-center justify-center space-y-12 w-full max-w-lg px-6 relative z-10",
            children: [
                t18,
                t20
            ]
        }, void 0, true, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 657,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[29] = t18;
        $[30] = t20;
        $[31] = t21;
    } else {
        t21 = $[31];
    }
    return t21;
};
_s3(LoveMeterStep, "ZVQpwjU6Dz5R8VBOzPsnxGRmMVo=");
_c3 = LoveMeterStep;
// --- Step 4: Typewriter ---
const TypewriterStep = (t0)=>{
    _s4();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(12);
    if ($[0] !== "0f51edf6d2fc42389011f13b2fac64aaaafb35cc015d98343a7393ac1fb76578") {
        for(let $i = 0; $i < 12; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0f51edf6d2fc42389011f13b2fac64aaaafb35cc015d98343a7393ac1fb76578";
    }
    const { onComplete } = t0;
    const [displayedText, setDisplayedText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isDeleting, setIsDeleting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t1;
    let t2;
    if ($[1] !== displayedText || $[2] !== isDeleting || $[3] !== onComplete) {
        t1 = ()=>{
            let timer;
            if (!isDeleting && displayedText !== "Happy Valentine Dindaa \u2764") {
                timer = setTimeout(()=>{
                    setDisplayedText("Happy Valentine Dindaa \u2764".slice(0, displayedText.length + 1));
                }, 150);
            } else {
                if (!isDeleting && displayedText === "Happy Valentine Dindaa \u2764") {
                    timer = setTimeout(()=>setIsDeleting(true), 2500);
                } else {
                    if (isDeleting && displayedText !== "") {
                        timer = setTimeout(()=>{
                            setDisplayedText("Happy Valentine Dindaa \u2764".slice(0, displayedText.length - 1));
                        }, 80);
                    } else {
                        if (isDeleting && displayedText === "") {
                            onComplete();
                        }
                    }
                }
            }
            return ()=>clearTimeout(timer);
        };
        t2 = [
            displayedText,
            isDeleting,
            onComplete,
            "Happy Valentine Dindaa \u2764"
        ];
        $[1] = displayedText;
        $[2] = isDeleting;
        $[3] = onComplete;
        $[4] = t1;
        $[5] = t2;
    } else {
        t1 = $[4];
        t2 = $[5];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    let t3;
    let t4;
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            opacity: 0
        };
        t4 = {
            opacity: 1
        };
        t5 = {
            opacity: 0,
            filter: "blur(20px)"
        };
        $[6] = t3;
        $[7] = t4;
        $[8] = t5;
    } else {
        t3 = $[6];
        t4 = $[7];
        t5 = $[8];
    }
    let t6;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
            animate: {
                opacity: [
                    0,
                    1,
                    0
                ]
            },
            transition: {
                repeat: Infinity,
                duration: 0.8
            },
            className: "inline-block w-2 sm:w-4 h-12 sm:h-20 bg-red-500 ml-2 align-middle"
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 742,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    let t7;
    if ($[10] !== displayedText) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t3,
            animate: t4,
            exit: t5,
            className: "flex items-center justify-center p-8 relative z-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-5xl sm:text-8xl font-playfair text-white text-center leading-tight",
                children: [
                    displayedText,
                    t6
                ]
            }, void 0, true, {
                fileName: "[project]/components/InteractionFlow.tsx",
                lineNumber: 754,
                columnNumber: 121
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 754,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[10] = displayedText;
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    return t7;
};
_s4(TypewriterStep, "DyAnUrRTwS2+/Ji5CcayHeShwfk=");
_c4 = TypewriterStep;
function InteractionFlow(t0) {
    _s5();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(22);
    if ($[0] !== "0f51edf6d2fc42389011f13b2fac64aaaafb35cc015d98343a7393ac1fb76578") {
        for(let $i = 0; $i < 22; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0f51edf6d2fc42389011f13b2fac64aaaafb35cc015d98343a7393ac1fb76578";
    }
    const { onFlowComplete } = t0;
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    let t1;
    let t2;
    let t3;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15)_0%,transparent_70%)]"
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 778,
            columnNumber: 10
        }, this);
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 779,
            columnNumber: 10
        }, this);
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BackgroundHearts, {}, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 780,
            columnNumber: 10
        }, this);
        $[1] = t1;
        $[2] = t2;
        $[3] = t3;
    } else {
        t1 = $[1];
        t2 = $[2];
        t3 = $[3];
    }
    let t4;
    if ($[4] !== step) {
        t4 = step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoveModeStep, {
            onComplete: {
                "InteractionFlow[<LoveModeStep>.onComplete]": ()=>setStep(2)
            }["InteractionFlow[<LoveModeStep>.onComplete]"]
        }, "step1", false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 791,
            columnNumber: 24
        }, this);
        $[4] = step;
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    let t5;
    if ($[6] !== step) {
        t5 = step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TicTacToeStep, {
            onComplete: {
                "InteractionFlow[<TicTacToeStep>.onComplete]": ()=>setStep(3)
            }["InteractionFlow[<TicTacToeStep>.onComplete]"]
        }, "step2", false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 801,
            columnNumber: 24
        }, this);
        $[6] = step;
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    let t6;
    if ($[8] !== step) {
        t6 = step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoveMeterStep, {
            onComplete: {
                "InteractionFlow[<LoveMeterStep>.onComplete]": ()=>setStep(4)
            }["InteractionFlow[<LoveMeterStep>.onComplete]"]
        }, "step3", false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 811,
            columnNumber: 24
        }, this);
        $[8] = step;
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    let t7;
    if ($[10] !== onFlowComplete || $[11] !== step) {
        t7 = step === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TypewriterStep, {
            onComplete: {
                "InteractionFlow[<TypewriterStep>.onComplete]": ()=>onFlowComplete()
            }["InteractionFlow[<TypewriterStep>.onComplete]"]
        }, "step4", false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 821,
            columnNumber: 24
        }, this);
        $[10] = onFlowComplete;
        $[11] = step;
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    let t8;
    if ($[13] !== t4 || $[14] !== t5 || $[15] !== t6 || $[16] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            mode: "wait",
            children: [
                t4,
                t5,
                t6,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 832,
            columnNumber: 10
        }, this);
        $[13] = t4;
        $[14] = t5;
        $[15] = t6;
        $[16] = t7;
        $[17] = t8;
    } else {
        t8 = $[17];
    }
    let t10;
    let t9;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute -top-24 -left-24 w-96 h-96 bg-red-900/20 blur-[100px] rounded-full"
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 844,
            columnNumber: 10
        }, this);
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute -bottom-24 -right-24 w-96 h-96 bg-pink-900/20 blur-[100px] rounded-full"
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 845,
            columnNumber: 11
        }, this);
        $[18] = t10;
        $[19] = t9;
    } else {
        t10 = $[18];
        t9 = $[19];
    }
    let t11;
    if ($[20] !== t8) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-50 bg-[#060010] flex items-center justify-center overflow-hidden",
            children: [
                t1,
                t2,
                t3,
                t8,
                t9,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 854,
            columnNumber: 11
        }, this);
        $[20] = t8;
        $[21] = t11;
    } else {
        t11 = $[21];
    }
    return t11;
}
_s5(InteractionFlow, "M88kfgrd7Unvr/hfMAIVxST1ckg=");
_c5 = InteractionFlow;
function _temp(_, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: "110vh",
            x: `${i * 10 + Math.random() * 5}%`,
            scale: 0.5
        },
        animate: {
            opacity: [
                0,
                0.2,
                0
            ],
            y: "-10vh",
            rotate: [
                0,
                180
            ],
            scale: [
                0.5,
                0.8,
                0.5
            ]
        },
        transition: {
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear"
        },
        className: "absolute text-red-500/10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
            size: 30,
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/InteractionFlow.tsx",
            lineNumber: 878,
            columnNumber: 43
        }, this)
    }, i, false, {
        fileName: "[project]/components/InteractionFlow.tsx",
        lineNumber: 863,
        columnNumber: 10
    }, this);
}
function _temp2(squares) {
    const lines = [
        [
            0,
            1,
            2
        ],
        [
            3,
            4,
            5
        ],
        [
            6,
            7,
            8
        ],
        [
            0,
            3,
            6
        ],
        [
            1,
            4,
            7
        ],
        [
            2,
            5,
            8
        ],
        [
            0,
            4,
            8
        ],
        [
            2,
            4,
            6
        ]
    ];
    for (const [a, b, c] of lines){
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return squares.includes(null) ? null : "draw";
}
function _temp3(v, i) {
    return v === null ? i : null;
}
function _temp4(v_0) {
    return v_0 !== null;
}
function _temp5(i_0) {
    return i_0 !== 4;
}
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "BackgroundHearts");
__turbopack_context__.k.register(_c1, "LoveModeStep");
__turbopack_context__.k.register(_c2, "TicTacToeStep");
__turbopack_context__.k.register(_c3, "LoveMeterStep");
__turbopack_context__.k.register(_c4, "TypewriterStep");
__turbopack_context__.k.register(_c5, "InteractionFlow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DomeGallery$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/DomeGallery.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractionFlow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/InteractionFlow.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function Home() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "3acaf352f6b5fcbed52f2d43d53d740d57bcf287efc56a3ae4f233e30d74f52b") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "3acaf352f6b5fcbed52f2d43d53d740d57bcf287efc56a3ae4f233e30d74f52b";
    }
    const [showGallery, setShowGallery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [
            "/1.jpeg",
            "/2.jpeg",
            "/3.jpeg",
            "/4.jpeg",
            "/5.jpeg",
            "/6.jpeg",
            "/7.jpeg",
            "/8.jpeg",
            "/9.jpeg",
            "/10.jpeg",
            "/11.jpeg",
            "/12.jpeg",
            "/13.jpeg",
            "/14.jpeg",
            "/15.jpeg"
        ];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const userImages = t0;
    let t1;
    if ($[2] !== showGallery) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "w-screen h-screen bg-[#060010]",
            children: !showGallery ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InteractionFlow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onFlowComplete: {
                    "Home[<InteractionFlow>.onFlowComplete]": ()=>setShowGallery(true)
                }["Home[<InteractionFlow>.onFlowComplete]"]
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 26,
                columnNumber: 75
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                        src: "/pretty.mp3",
                        autoPlay: true,
                        loop: true,
                        className: "hidden"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 28,
                        columnNumber: 59
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DomeGallery$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        images: userImages,
                        fit: 0.8,
                        minRadius: 600,
                        maxVerticalRotationDeg: 0,
                        segments: 34,
                        dragDampening: 2,
                        grayscale: false,
                        autoRotationSpeed: 0.1
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 28,
                        columnNumber: 133
                    }, this)
                ]
            }, void 0, true)
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 26,
            columnNumber: 10
        }, this);
        $[2] = showGallery;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    return t1;
}
_s(Home, "JJ7qveRHtlBVbTYrbbj+gMo4UKI=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_10487abb._.js.map