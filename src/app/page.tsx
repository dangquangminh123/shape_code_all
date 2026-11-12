import React from 'react';
import Link from 'next/link';
import StepStackDemo from '@/components/shapes/step-stack-demo/StepStackDemo';
import { SHAPE_TEMPLATES_REGISTRY } from '@/data/shape-registry';

export default function HomePage() {
  return (
    <>
      {/* PHẦN 1: HIỂN THỊ TRỰC TIẾP GIAO DIỆN MẪU 01 - STEP STACK DEMO */}
      <section aria-labelledby="demo-heading">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '14px',
            gap: '12px',
          }}
        >
          <div>
            <h1
              id="demo-heading"
              style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#0f172a' }}
            >
              Mẫu 01: UI Shape 3 Tầng (Step Stack Demo)
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#64748b' }}>
              Stack 3 tầng bên trái (01, 02, 03) – 2 khối nội dung so le bên phải. Rê chuột vào từng
              tầng shape hoặc từng khối nội dung để kiểm tra liên kết hover 2 chiều.
            </p>
          </div>
          <Link
            href="/shapes/step-stack-demo"
            style={{
              fontSize: '13.5px',
              fontWeight: 700,
              color: '#d61f45',
            }}
          >
            Mở chế độ toàn trang &rarr;
          </Link>
        </div>

        <StepStackDemo showControls={true} />
      </section>

      {/* PHẦN 2: BẢNG CHỈ DẪN ĐẶT FILE SVG & PHÂN CHIA THƯ MỤC ĐA SHAPE */}
      <section className="guide-card">
        <h2>Hướng dẫn vị trí bỏ file SVG tài nguyên &amp; Quy chuẩn tách Folder cho nhiều mẫu Shape</h2>
        <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>
          Để dự án chứa được nhiều giao diện UI Shape khác nhau mà không bao giờ bị đè hoặc nhầm file
          SVG, mỗi kiểu giao diện được tách riêng cả <strong>Folder chứa SVG</strong> lẫn{' '}
          <strong>Tiền tố (Prefix) tên file</strong>:
        </p>

        <div className="guide-grid">
          {SHAPE_TEMPLATES_REGISTRY.map((tpl) => (
            <div key={tpl.id} className="guide-box">
              <h4>
                [{tpl.prefix.toUpperCase()}] {tpl.vietnameseTitle}
              </h4>
              <p style={{ margin: '0 0 8px' }}>{tpl.description}</p>
              <ul>
                <li>
                  <strong>Folder bỏ file SVG:</strong> <code>{tpl.publicSvgFolder}</code>
                </li>
                <li>
                  <strong>Folder code Component:</strong> <code>{tpl.componentSourceFolder}</code>
                </li>
                {tpl.assets.length > 0 && (
                  <li>
                    <strong>3 file SVG của mẫu này:</strong>
                    <ul>
                      {tpl.assets.map((asset) => (
                        <li key={asset.level}>
                          <strong>{asset.role}:</strong> <code>{asset.prefixedFileName}</code>
                          {' — '}{asset.dimensions}
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
