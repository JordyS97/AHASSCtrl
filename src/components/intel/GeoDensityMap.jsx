import React from 'react';

const GeoDensityMap = ({ geo }) => {
    // We will build a visually abstract floating bubble network mapping to relative regions as shown in the mockup.
    // In a full production map, this would be an SVG lat/long projection.

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', minHeight: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Customer Density Map</h3>
                    <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>Kecamatan × Kabupaten — bubble = cust count, color = segment</p>
                </div>
                <div style={{ padding: '0.3rem 0.8rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>GEO MAP</div>
            </div>

            {/* Abstract Relative Node Map Grid */}
            <div style={{
                flex: 1,
                position: 'relative',
                background: 'rgba(10, 15, 30, 0.3)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.02)',
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                overflow: 'hidden'
            }}>

                {/* Workshop Node Center */}
                <div style={{ position: 'absolute', top: '50%', left: '45%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                    <div style={{ width: 12, height: 12, background: 'var(--accent-cyan)', borderRadius: '50%', boxShadow: '0 0 15px var(--accent-cyan)', border: '2px solid #fff' }}></div>
                    <span style={{ position: 'absolute', top: -20, left: -25, fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>Workshop</span>
                </div>

                {/* Nodes (Abstract Representation) */}
                <div style={{ position: 'absolute', top: '40%', left: '42%', transform: 'translate(-50%, -50%)', width: '140px', height: '100px', background: 'rgba(0, 242, 254, 0.1)', border: '1px solid var(--accent-cyan)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>1,284</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Kab. Bandung</span>
                </div>

                <div style={{ position: 'absolute', top: '35%', left: '75%', transform: 'translate(-50%, -50%)', width: '100px', height: '70px', background: 'rgba(0, 242, 254, 0.1)', border: '1px solid var(--accent-cyan)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>842</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Kab. Bekasi</span>
                </div>

                <div style={{ position: 'absolute', top: '65%', left: '25%', transform: 'translate(-50%, -50%)', width: '90px', height: '80px', background: 'rgba(170, 80, 255, 0.1)', border: '1px solid var(--accent-purple)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>620</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Kab. Bogor</span>
                </div>

                <div style={{ position: 'absolute', top: '75%', left: '45%', transform: 'translate(-50%, -50%)', width: '80px', height: '60px', background: 'rgba(0, 255, 128, 0.1)', border: '1px solid var(--accent-green)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>510</span>
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Kota Bandung</span>
                </div>

                <div style={{ position: 'absolute', top: '70%', left: '60%', transform: 'translate(-50%, -50%)', width: '80px', height: '50px', background: 'rgba(255, 165, 0, 0.1)', border: '1px solid var(--accent-orange)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>388</span>
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Kab. Sumedang</span>
                </div>

                <div style={{ position: 'absolute', top: '80%', left: '28%', transform: 'translate(-50%, -50%)', width: '60px', height: '40px', background: 'rgba(0, 255, 128, 0.1)', border: '1px solid var(--accent-green)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.8rem', color: '#fff' }}>286</span>
                    <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>Kota Cimahi</span>
                </div>

                <div style={{ position: 'absolute', top: '80%', left: '72%', transform: 'translate(-50%, -50%)', width: '60px', height: '40px', background: 'rgba(170, 80, 255, 0.1)', border: '1px solid var(--accent-purple)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.8rem', color: '#fff' }}>212</span>
                    <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>Kab. Karawang</span>
                </div>

            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'absolute', bottom: '2rem', left: '2rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 8, height: 8, background: 'var(--accent-cyan)', borderRadius: '2px' }}></div> Regular dominant</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 8, height: 8, background: 'var(--accent-purple)', borderRadius: '2px' }}></div> Group dominant</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 8, height: 8, background: 'var(--accent-green)', borderRadius: '2px' }}></div> High value mix</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 8, height: 8, background: 'var(--accent-orange)', borderRadius: '2px' }}></div> Emerging</div>
            </div>

        </div>
    );
};

export default GeoDensityMap;
